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
