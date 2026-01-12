import express from "express";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { nanoid } from "nanoid";
import { db } from "../db/index.js";
import { urlsTable } from "../models/index.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import { and, eq } from "drizzle-orm";

const router = express.Router();

router.post("/shorten", ensureAuthenticated, async function (req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        error:
          "Request body is missing. Ensure you have set the 'Content-Type' header to 'application/json'.",
      });
    }
    const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
      req.body
    );

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error });
    }

    const { url, code } = validationResult.data;

    const shortCode = code ?? nanoid(6);

    const [result] = await db
      .insert(urlsTable)
      .values({
        shortCode,
        targetURL: url,
        userId: req.user.id,
      })
      .returning({
        id: urlsTable.id,
        shortCode: urlsTable.shortCode,
        targetURL: urlsTable.targetURL,
      });

    return res.status(201).json({
      id: result.id,
      shortCode: result.shortCode,
      targetURL: result.targetURL,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/codes", ensureAuthenticated, async function (req, res) {
  try {
    const codes = await db
      .select()
      .from(urlsTable)
      .where(eq(urlsTable.userId, req.user.id));

    return res.json({ codes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.delete("/:id", ensureAuthenticated, async function (req, res) {
  try {
    const id = req.params.id;
    await db
      .delete(urlsTable)
      .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));

    return res.status(200).json({ deleted: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.get("/:shortCode", async function (req, res) {
  try {
    const code = req.params.shortCode;
    const [result] = await db
      .select({ targetURL: urlsTable.targetURL })
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, code));

    if (!result) {
      return res.status(404).json({ error: "Invalid URL" });
    }

    return res.redirect(result.targetURL);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
