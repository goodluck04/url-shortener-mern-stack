import bcryptjs from "bcryptjs";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import vine, { errors } from "@vinejs/vine";
import User from "../model/user.model.js"
import { ErrorHandler } from "../utils/extendError.js";
import jwt from "jsonwebtoken"


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

    static async login(req, res, next) {
        try {
            const body = req.body;

            const validator = vine.compile(loginSchema);
            const payload = await validator.validate(body);

            const validUser = await User.findOne({ email: payload.email });

            // if user not found in db
            if (!validUser) return next(new ErrorHandler("User not found!", 404));

            // if password is not correct => return boolean
            const validPassword = bcryptjs.compareSync(payload.password, validUser.password);

            if (!validPassword) return next(new ErrorHandler("Wrong credentials!", 401));

            // authenticating
            const token = jwt.sign({ id: validUser.id }, process.env.JWT_SECRET, {
                expiresIn: "365d",
            });
            // user without password
            const userWithoutPassword = await User.findOne({ email: payload.email }).select("-password");
            // send the token
            res
                .cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(userWithoutPassword);
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
