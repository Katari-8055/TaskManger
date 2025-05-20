import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies?.token;

  console.log(req.cookies.token);
  if (!token) {
    console.warn("⛔ No token found in cookies.");
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Now you can access `req.user.userId`
    next();
  } catch (error) {
    console.error("⛔ JWT verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
