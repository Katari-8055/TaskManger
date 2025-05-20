import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";


//Create Account----------------------------------------------------

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    // Send token as HttpOnly cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,               // ✅ Must be true for HTTPS (Render uses HTTPS)
  sameSite: "None",           // ✅ Allow cross-origin
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

    // Respond with user data and token (excluding password)
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      message: "User registered successfully"
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

//Login Account-----------------------------------------------------

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Incorrect Email" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Icorrect Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    // Send token as HttpOnly cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,               // ✅ Must be true for HTTPS (Render uses HTTPS)
  sameSite: "None",           // ✅ Allow cross-origin
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

    // Respond with minimal user info (no password)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

//getUsers---------------------------------------------------------

export const getUsers = async (req, res) => {
  const userId = req.user.userId;

  try {
    const isUser = await User.findById(userId);

    if (!isUser) {
      return res.sendStatus(401); // Unauthorized: user not found
    }

    return res.json({
      user: {
        name: isUser.name,
        email: isUser.email,
        _id: isUser._id, // ✅ Corrected here
        createdOn: isUser.createdOn,
      },
      message: "",
    });

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};



// logout user


export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,       // ✅ required for HTTPS / production
    sameSite: "None",   // ✅ must match how it was originally set
  });

  return res.json({ message: "Logged out successfully" });
};
