import express from "express";
import { signupUser, loginUser, getUsers, logoutUser } from "../Controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup", signupUser);
router.post("/login",  loginUser);
router.get("/getuser",authenticateUser,  getUsers);
router.post("/logout", logoutUser)

export default router;