import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

const BolgSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }], // Assuming likes contain user IDs
    default: [],
  },
  comments: [commentSchema],
});

const BlogModel = mongoose.model("Blog", BolgSchema);
export default BlogModel;
