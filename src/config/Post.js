const Post = require('../models/Post');

// Create a new post
const newPost = await Post.create({
  title: "Learning Mongoose",
  content: "Mongoose makes MongoDB easy to use with Node.js...",
  author: "Alice",
  tags: ["mongodb", "nodejs"]
});

// Like a post
await newPost.like();

// Find posts by author
const postsByAlice = await Post.findByAuthor("Alice");
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);
router.patch('/:id/like', postsController.likePost);

module.exports = router;

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    tags: [{ type: String, trim: true }],
    published: { type: Boolean, default: true },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

// Virtual populate
postSchema.virtual('commentList', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
});

// Enable virtuals in JSON
postSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Post', postSchema);


