import bcryptjs from "bcryptjs";
import { editUrlSchema, userUrlSchema, getUrlSchema } from "../validation/url.validation.js";
import UrlModel from "../model/url.model.js"
import vine, { errors } from "@vinejs/vine";
import { ErrorHandler } from "../utils/extendError.js";
import jwt from "jsonwebtoken";
import { nanoid } from 'nanoid'




class UrlController {
    static async generateShortUrl(req, res, next) {
        try {
            const body = req.body;
            const authUser = req.user;
            // validating request body with vinejs
            const validator = vine.compile(getUrlSchema)
            const payload = await validator.validate(body);
            // create shortId of size character
            const shortId = nanoid(8);
            // save the url
            await UrlModel.create({
                shortId: shortId,
                userId: authUser.id,
                urlName: payload.urlName,
                redirectURL: payload.url,
                visitHistory: []
            });
            // send response
            res.status(201).json({ message: "Short url created successfully", id: shortId });
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: error.messages })
            } else {
                next(error);
            }
        }
    }
    // in frontend add endpoint+params 
    static async getUrl(req, res, next) {
        try {
            const shortId = req.params.shortId;
            // add timestamp when this url is hit/clicked
            const entry = await UrlModel.findOneAndUpdate({
                shortId,
            }, {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            });
            // if shortUrl is wrong
            if (!entry) {
                return next(new ErrorHandler("Page Not found 404", 404));
            }

            res.redirect(entry.redirectURL);

        } catch (error) {
            next(error)
        }
    }
    // all the url created by user
    static async getAllUrl(req, res, next) {
        try {
            if (req.user.id === req.params.id) {
                const getUserUrls = await UrlModel.find({
                    userId: req.params.id
                });
                res.status(200).json(getUserUrls);
            } else {
                return next(new ErrorHandler("You can only view your own Urls"))
            }
        } catch (error) {
            next(error)
        }
    }
    // get short-url info
    static async getUrlInfo(req, res, next) {
        try {
            const shortId = req.params.id;
            const validator = vine.compile(userUrlSchema)
            const payload = await validator.validate(req.body);

            // checking auth
            if (req.user.id === payload.userId) {
                const getUserUrl = await UrlModel.findOne({
                    shortId: shortId
                });
                if (!getUserUrl) {
                    return next(new ErrorHandler("this url does not exist", 400))
                }
                res.status(200).json(getUserUrl);
            } else {
                return next(new ErrorHandler("You can only view your own Urls"))
            }
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: error.messages })
            } else {
                next(error);
            }
        }
    }
    // delete
    static async deleteUrl(req, res, next) {
        try {
            const shortId = req.params.id;
            // validating request body with vinejs
            const validator = vine.compile(userUrlSchema)
            const payload = await validator.validate(req.body);
            // checking auth
            if (req.user.id === payload.userId) {
                const getUserUrl = await UrlModel.findOneAndDelete({
                    shortId: shortId
                });
                if (!getUserUrl) {
                    return next(new ErrorHandler("this url does not exist", 400))
                }

                res.status(200).json({ message: "Url delete successfully" });
            } else {
                return next(new ErrorHandler("You can only delete your own Urls"))
            }
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: error.messages })
            } else {
                next(error);
            }
        }
    }
    // delete
    static async editUrl(req, res, next) {
        try {
            const shortId = req.params.id;
            const body = req.body;

            // validating request body with vinejs
            const validator = vine.compile(editUrlSchema)
            const payload = await validator.validate(body);

            // checking auth
            if (req.user.id === payload.userId) {
                const getUserUrl = await UrlModel.findOneAndUpdate({
                    shortId: shortId
                }, {
                    urlName: payload.urlName,
                    redirectURL: payload.url
                });
                // if url doesnt exist
                if (!getUserUrl) {
                    return next(new ErrorHandler("this url does not exist", 400))
                }

                res.status(200).json({ message: "Url update successfully" });
            } else {
                return next(new ErrorHandler("You can only update your own Urls", 400))
            }
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return res.status(400).json({ errors: error.messages })
            } else {
                next(error);
            }
        }
    }
}


export default UrlController;
