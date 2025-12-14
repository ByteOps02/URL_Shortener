import express from "express";
import { signupPostRequestBodySchema } from "../validation/request.validation.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { getUserByEmail } from "../services/user.service.js";
import { createNewUser } from "../services/newuser.service.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // const { firstname, lastname, email, password } = req.body;

    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
      req.body
    );

    if (validationResult.error) {
      return res.status(400).json({
        error: validationResult.error.format(),
      });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    // const [existingUser] = await db
    //   .select({ id: usersTable.id })
    //   .from(usersTable)
    //   .where(eq(usersTable.email, email));

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        error: `User with email ${email} already exists!`,
      });
    }

    // const salt = randomBytes(256).toString("hex");
    // const hashedPassword = createHmac("sha256", salt)
    //   .update(password)
    //   .digest("hex");

    const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

    // const [user] = await db
    //   .insert(usersTable)
    //   .values({
    //     firstname,
    //     lastname,
    //     email,
    //     salt,
    //     password: hashedPassword,
    //   })
    //   .returning({ id: usersTable.id });

    // return res.status(201).json({
    //   data: {
    //     userId: user.id,
    //   },
    // });

    const user = await createNewUser({
      firstname,
      lastname,
      email,
      salt,
      hashedPassword,
    });

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
