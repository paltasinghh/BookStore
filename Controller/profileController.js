import Profile from "../Model/profileModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir); // create folder if not exists
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"), false);
  },
}).single("photo"); // single file upload

// CREATE PROFILE
export const createProfile = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { firstName, lastName, middleName, age, phoneNumber } = req.body;

      const newProfile = new Profile({
        firstName,
        lastName,
        middleName,
        age,
        phoneNumber,
        photo: req.file ? req.file.path : null, // store file path
      });

      await newProfile.save();

      res.status(201).json({
        message: "Profile created successfully",
        profile: newProfile,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { firstName, lastName, middleName, age, phoneNumber } = req.body;

      const updatedProfile = await Profile.findByIdAndUpdate(
        req.params.id,
        {
          firstName,
          lastName,
          middleName,
          age,
          phoneNumber,
          photo: req.file ? req.file.path : undefined, // only update if new photo uploaded
        },
        { new: true }
      );

      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
};

// GET ALL PROFILES
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("category");
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// DELETE PROFILE
export const deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
