import express from "express";
import {
  commentBlog,
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  likeUnlikeBlog,
  updateBlog,
  updateComment,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/create", createBlog);
router.put("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);
router.put("/like/:id", likeUnlikeBlog);
router.post("/comment/:id", commentBlog);
router.put("/:blogId/comments/:commentId", updateComment);

export default router;
