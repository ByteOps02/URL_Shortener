import express from "express";
import { randomBytes, createHmac } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { usersTable } from "../models/index.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const [existingUser] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser) {
      return res.status(400).json({
        error: `User with email ${email} already exists!`,
      });
    }

    const salt = randomBytes(256).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    const [user] = await db
      .insert(usersTable)
      .values({
        firstname,
        lastname,
        email,
        salt,
        password: hashedPassword,
      })
      .returning({ id: usersTable.id });

    return res.status(201).json({
      data: {
        userId: user.id,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

export default router;
