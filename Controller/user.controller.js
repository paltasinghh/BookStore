import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import User from "../model/user.model.js";
import Role from "../model/roleModel.js";


const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullname, email, password, role, status } = req.body;

    if(!validatePassword(password)){
      return res.status(400).json({
        message: "password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      })
    }
    const existingUser = await User.findOne({ email, isDeleted: false });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    let roleDoc;
    if (role) {
      roleDoc = await Role.findById(role);
      if (!roleDoc) {
        return res.status(400).json({ message: "Invalid role ID" });
      }
    } else {
      roleDoc = await Role.findOne({ roleCategory: "Guest" });

      if (!roleDoc) {
        roleDoc = await Role.create({
          roleName: "Visitor",
          roleCategory: "Guest",
          status: "active",
        });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      role: roleDoc._id,
      status: status || "active",
    });

    await newUser.save();

    
    const { password: _, ...safeUser } = newUser.toObject();

    res.status(201).json({
      message: "User created successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error(" Error creating user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false })
      .populate("role", "roleName roleCategory occupancyStatus");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false })
      .populate("role", "roleName roleCategory occupancyStatus");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { fullname, email, role, status } = req.body;

    const user = await User.findOne({ _id: req.params.id, isDeleted: false });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (role) {
      const roleDoc = await Role.findById(role);
      if (!roleDoc) return res.status(400).json({ message: "Invalid role ID" });
      user.role = roleDoc._id;
    }

    if (fullname) user.fullname = fullname;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email, isDeleted: false });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (status) user.status = status;

    await user.save();

    const { password, ...safeUser } = user.toObject();
    res.status(200).json({ message: "User updated successfully", user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
