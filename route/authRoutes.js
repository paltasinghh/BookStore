import express from "express";
import { login, tokenSignIn, loginToken } from "../Controller/authController.js";

const router = express.Router();

// router.post("/login", loginUser);           // For user login with email/password
router.post("/login", login);
router.post("/token-signin", tokenSignIn);  // For login using an existing token
router.get("/verify-token", loginToken);    // For verifying a token in Authorization header

export default router;
