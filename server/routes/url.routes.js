import express from "express";
import UrlController from "../controller/url.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// public route
router.get("/:shortId", UrlController.getUrl);

// PRIVATE ROUTES

router.post("/url", verifyToken,UrlController.generateShortUrl);
// id =userId
router.get("/get-all-url/:id", verifyToken,UrlController.getAllUrl);

// id = shortId
router.get("/get-url/:id", verifyToken,UrlController.getUrlInfo);
router.delete("/delete-url/:id", verifyToken,UrlController.deleteUrl);
router.put("/edit-url/:id", verifyToken,UrlController.editUrl);




export default router;