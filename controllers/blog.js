import BlogModel from "../models/blog.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, image, description, user } = req.params;
    const newBlog = new BlogModel({
      title,
      image,
      description,
      user,
    });
    try {
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.params.id;
    const blog = await BlogModel.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndDelete(id);
    res.status(200).json({ data: blog, message: "deleted blog successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const likeUnlikeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const blog = await BlogModel.findById(id);
    if (blog.likes.includes(userId)) {
      await blog.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Blog Disliked");
    } else {
      await blog.updateOne({ $push: { likes: userId } });
      res.status(200).json("Blog liked");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
