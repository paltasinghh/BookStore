import bcryptjs from "bcryptjs";
import User from "../model/user.model.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });
    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Your account is inactive. Please contact support.",
      });
    }

    // password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(
      { userId: user._id, email: user.email },
      "1h"
    );

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// export const login = async(req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         const isMatch = await bcryptjs.compare(password, user.password);
//         if (!user || !isMatch) {
//             return res.status(400).json({ message: "Invalid username or password" });
//         } else {
//             res.status(200).json({
//                 message: "Login successful",
//                 user: {
//                     _id: user._id,
//                     fullname: user.fullname,
//                     email: user.email,
//                 },
//             });
//         }
//     } catch (error) {
//         console.log("Error: " + error.message);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
export const tokenSignIn = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token)
      return res.status(400).json({ message: "Token is required" });

    const decoded = verifyToken(token);
    if (!decoded)
      return res.status(401).json({ message: "Invalid or expired token" });

    const user = await User.findById(decoded.userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Token sign-in successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Token SignIn Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const loginToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Token missing" });

    const decoded = verifyToken(token);
    if (!decoded)
      return res.status(401).json({ message: "Invalid or expired token" });

    const user = await User.findById(decoded.userId);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "Token verified successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("LoginToken Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
