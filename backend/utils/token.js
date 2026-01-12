import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validation/token.validation.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export async function createUserToken(payload) {
  const validationResult = await userTokenSchema.safeParseAsync(payload);

  if (validationResult.error) throw new Error(validationResult.error.message);

  const payloadValidatedData = validationResult.data;

  const token = jwt.sign(payloadValidatedData, JWT_SECRET);
  return token;
}

export async function validateToken(token) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		const validationResult = await userTokenSchema.safeParseAsync(decoded);
		if (validationResult.error) {
			return { error: validationResult.error.message };
		}
		return { data: validationResult.data };
	} catch (error) {
		return { error: error.message };
	}
}
