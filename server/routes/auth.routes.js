import express from "express";
import AuthController from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", AuthController.register);
router.post("/signin", AuthController.login);
// router.post("/google", google);
// router.get("/signout", signOut);


export default router;