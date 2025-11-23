import { validationResult } from "express-validator";
import Role from "../model/roleModel.js";

// ✅ Create Role
export const createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { roleName, status } = req.body;

  try {
    const newRole = new Role({ roleName, status });
    await newRole.save();
    return res.status(201).json(newRole);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get All Roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isDeleted: false });
    return res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Get Role by ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findOne({ _id: req.params.id, isDeleted: false });
    if (!role) return res.status(404).json({ message: "Role not found" });
    return res.status(200).json(role);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Update Role Status
export const updateRoleStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const role = await Role.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { status },
      { new: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });
    return res.status(200).json(role);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Soft Delete Role
export const deleteRoleById = async (req, res) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!role) return res.status(404).json({ message: "Role not found" });
    return res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
