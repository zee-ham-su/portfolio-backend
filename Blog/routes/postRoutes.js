const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Route to get all posts
router.get('/', PostController.getAllPosts);

// Route to get a single post by ID
router.get('/:id', PostController.getPostById);

// Route to create a new post
router.post('/', PostController.createPost);

// Route to update a post by ID
router.put('/:id', PostController.updatePostById);

// Route to delete a post by ID
router.delete('/:id', PostController.deletePostById);

module.exports = router;
