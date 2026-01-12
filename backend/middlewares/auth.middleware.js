import { validateToken } from "../utils/token.js";
import { getUserById } from "../services/user.service.js";

/**
 *
 * @param {import("express").Request}req
 * @param {import("express").Response}res
 * @param {import("express").NextFunction}next
 *
 */

export async function authenticationMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return next();

    if (!authHeader.startsWith("Bearer"))
      return res
        .status(400)
        .json({ error: "Authorization header must start with Bearer" });

    const token = authHeader.split(" ")[1];

    const validationResult = await validateToken(token);

    if (validationResult.error) {
      return res.status(401).json({
        error: validationResult.error,
      });
    }

    const user = await getUserById(validationResult.data.id);

    if (!user) {
      return res.status(401).json({
        error: "Invalid Token",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

export function ensureAuthenticated(req, res, next) {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this resource" });
  }
  next();
}
