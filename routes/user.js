import express from "express";
import { getAllUsers, login, signup, updateUser} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.put("/update/:id",updateUser)

export default router;
