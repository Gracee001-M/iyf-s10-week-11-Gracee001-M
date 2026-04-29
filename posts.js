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

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');

// Post routes
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);
router.patch('/:id/like', postsController.likePost);

// Comment routes (nested under posts)
router.get('/:postId/comments', commentsController.getComments);
router.post('/:postId/comments', commentsController.createComment);
router.delete('/:postId/comments/:commentId', commentsController.deleteComment);

module.exports = router;

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { protect, optionalAuth, restrictTo } = require('../middleware/auth');

// Public routes
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);

// Protected routes (requires login)
router.post('/', protect, postsController.createPost);
router.put('/:id', protect, postsController.updatePost);
router.delete('/:id', protect, postsController.deletePost);

// Admin-only route
router.delete('/:id/force', protect, restrictTo('admin'), postsController.forceDelete);

module.exports = router;
