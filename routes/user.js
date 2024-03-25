import express from "express";
import { getAllUsers, login, signup, updateUser, deleteUser} from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
router.put("/update/:id",updateUser)
router.delete("/delete/:id",deleteUser)
export default router;
