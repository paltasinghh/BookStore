import express from "express";
import { signup, login } from "../Controller/user.controller.js";

const router = express.Router();

router.post("/signup", signup);  // Pass the signup function here
router.post("/login", login);

export default router;
