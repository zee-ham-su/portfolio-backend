const Comment = require('../models/Comment');

const CommentController = {
    // Get all comments
    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get comments for a specific post
    getCommentsForPost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const comments = await Comment.find({ post: postId });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new comment
    createComment: async (req, res) => {
        try {
            const { post, author, content } = req.body;
            const newComment = new Comment({ post, author, content });
            const savedComment = await newComment.save();
            res.status(201).json(savedComment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update a comment by ID
    updateCommentById: async (req, res) => {
        try {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.json(updatedComment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete a comment by ID
    deleteCommentById: async (req, res) => {
        try {
            const deletedComment = await Comment.findByIdAndDelete(req.params.id);
            if (!deletedComment) {
                return res.status(404).json({ error: 'Comment not found' });
            }
            res.json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = CommentController;
