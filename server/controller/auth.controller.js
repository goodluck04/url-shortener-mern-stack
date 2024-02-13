import bcryptjs from "bcryptjs";
import { loginSchema, registerSchema } from "../validation/signup.validation.js";
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
                
            },);

            // destructure validUser then send data without password
            const { password: pass, ...rest } = validUser._doc; //it will avoid password in res
            // send response
            res
                .cookie("access_token", token, { httpOnly: true, secure:true, sameSite: "none" })
                .status(200)
                .json({ rest, message: "logged in Successfully!" });
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: error.messages })
            } else {
                next(error);
            }
        }
    }

    // sign out
    static async signOut(req, res, next) {
        try {

            res
                .clearCookie("access_token")
                .status(200)
                .json({ message: "User has been logged out!" });
        } catch (error) {
            next(error);
        }
    };
    // sign out
    static async userInfo(req, res, next) {
        try {
            const userId = req.user?.id;
            const getUser = await User.findById(userId).select("-password");
            res.status(200).json(getUser);
        } catch (error) {
            return next(error)
        }
    };
}


export default AuthController;
