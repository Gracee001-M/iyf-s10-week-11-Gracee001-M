// src/controllers/postsController.js
const Post = require('../models/Post');

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

// Get single post by ID
const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    next(error);
  }
};

// Create new post
const createPost = async (req, res, next) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// Update post
const updatePost = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Delete post
const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};

const Post = require('../models/Post');

// Create post (linked to logged-in user)
const createPost = async (req, res, next) => {
    try {
        const { title, content, tags } = req.body;

        const post = new Post({
            title,
            content,
            author: req.user._id,  // comes from auth middleware
            tags
        });

        await post.save();
        await post.populate('author', 'username email');

        res.status(201).json(post);
    } catch (error) {
        next(error);
    }
};

// Update post (only author can edit)
const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'You can only edit your own posts' });
        }

        const { title, content, tags } = req.body;
        post.title = title || post.title;
        post.content = content || post.content;
        post.tags = tags || post.tags;

        await post.save();
        res.json(post);
    } catch (error) {
        next(error);
    }
};

// Get all posts with author info
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username email')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        next(error);
    }
};

module.exports = { createPost, updatePost, getAllPosts };



