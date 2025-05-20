import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";
export const authenticateUser = (req, res, next) => {


  const token = req.cookies.token;
  if (!token) {
    console.log("No token found in cookies.");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
