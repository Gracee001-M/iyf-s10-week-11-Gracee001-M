const express = require('express');
const router = express.Router();

const postsRoutes = require('./posts');
const usersRoutes = require('./users');
const authRoutes = require('./auth');

router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

router.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

module.exports = router;
