const Post = require('../models/Post');

const PostController = {
    // Get all posts
    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.find();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get a single post by ID
    getPostById: async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Create a new post
    createPost: async (req, res) => {
        try {
            const { title, content, author } = req.body;
            const newPost = new Post({ title, content, author });
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Update a post by ID
    updatePostById: async (req, res) => {
        try {
            const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(updatedPost);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Delete a post by ID
    deletePostById: async (req, res) => {
        try {
            const deletedPost = await Post.findByIdAndDelete(req.params.id);
            if (!deletedPost) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = PostController;
