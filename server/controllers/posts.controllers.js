import Post from "../models/Post.js";
import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const postFound = await Post.findById(id);
    if (!postFound) {
      return res.sendStatus(404);
    }
    return res.json(postFound);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let image;
    if (req.files?.image) {
      const { secure_url, public_id } = await uploadImage(
        req.files.image.tempFilePath
      );
      await fs.remove(req.files.image.tempFilePath);
      image = { url: secure_url, public_id };
    }
    const newPost = new Post({ title, description, image });
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, body, { new: true });
    return res.json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postRemoved = await Post.findByIdAndDelete(id);
    if (!postRemoved) {
      return res.sendStatus(404);
    }
    if (postRemoved.image.public_id) {
      await deleteImage(postRemoved.image.public_id);
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
