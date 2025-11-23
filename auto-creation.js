import mongoose from "mongoose";
import User from "./model/user.model.js";
import Role from "./model/roleModel.js";
import bcrypt from "bcryptjs";
import fs from "fs";
const rolesJSON = JSON.parse(fs.readFileSync(new URL("./json/role.json", import.meta.url)));


const MONGO_URI = process.env.MongoDBURI || "mongodb://127.0.0.1:27017/your-db";

// ✅ Express route handler
export const initDatabase = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected for initialization...");
    }

    const results = {
      rolesCreated: [],
      rolesSkipped: [],
      superAdminCreated: false,
    };
    for (const role of rolesJSON) {
      const existingRole = await Role.findOne({ roleName: role.roleName });
      if (!existingRole) {
        const newRole = await Role.create(role);
        results.rolesCreated.push(newRole.roleName);
      } else {
        results.rolesSkipped.push(existingRole.roleName);
      }
    }
    const superAdminRole = await Role.findOne({ roleCategory: "super_admin" });
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("SuperAdmin123!", 10);
      await User.create({
        fullname: "Super Admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: superAdminRole._id,
        status: "active",
      });
      results.superAdminCreated = true;
    }

    res.status(200).json({
      message: "Database initialization complete!",
      details: results,
    });
  } catch (err) {
    console.error("Database initialization failed:", err);
    res.status(500).json({ message: "Database initialization failed", error: err.message });
  }
};
