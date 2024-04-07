const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

// Route to get all comments
router.get('/', CommentController.getAllComments);

// Route to get comments for a specific post
router.get('/post/:postId', CommentController.getCommentsForPost);

// Route to create a new comment
router.post('/', CommentController.createComment);

// Route to update a comment by ID
router.put('/:id', CommentController.updateCommentById);

// Route to delete a comment by ID
router.delete('/:id', CommentController.deleteCommentById);

module.exports = router;
