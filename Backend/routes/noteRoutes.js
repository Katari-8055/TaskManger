import express from "express";
import { addNotes, deletenotes, editNotes, getnotes, pinnednotes ,serchnotes} from "../Controllers/noteController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/addnotes", authenticateUser, addNotes);
router.put("/editnotes/:noteId", authenticateUser, editNotes);
router.get("/getnotes", authenticateUser, getnotes)
router.delete("/deletenote/:noteId",authenticateUser,  deletenotes);
router.put("/pinnednotes/:noteId",authenticateUser,  pinnednotes);
router.get("/searchnotes", authenticateUser, serchnotes)

export default router;
