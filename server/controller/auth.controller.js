import bcryptjs from "bcryptjs";
import { registerSchema } from "../validation/signup.validation.js";
import vine, { errors } from "@vinejs/vine";
import User from "../model/user.model.js"


class AuthController {
    static async register(req, res, next) {
        try {
            const body = req.body;
            // validating request body with vinejs
            const validator = vine.compile(registerSchema)
            const payload = await validator.validate(body);

            // check if user is

            payload.password = bcryptjs.hashSync(payload.password, 10);

            const newUser = new User(payload);
            await newUser.save();
            res.status(201).json({ message: "User created successfully", newUser });
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: error.messages })
            } else {
                next(error);
            }
        }
    }
}

export default AuthController;
