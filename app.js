import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import roleRoutes from "./route/roleRoutes.js";
import authRouters from "./route/authRoutes.js";
import profileRoutes from "./route/profileRoutes.js";
import { initDatabase } from "./auto-creation.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/books", bookRoute);
app.use("/user", userRoute);
app.use("/role", roleRoutes);
app.use("/auth", authRouters);
app.use("/profile", profileRoutes);

// Initialize default data (optional)
app.get("/init-database", initDatabase);

// Serve Frontend build in production
// if (process.env.NODE_ENV === "production") {
//   const dirPath = path.resolve();
//   app.use(express.static("Frontend/dist"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(dirPath, "Frontend", "dist", "index.html"));
//   });
// }

export default app;

//heroku