const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// In-memory token blacklist
const tokenBlacklist = new Set();

const UserController = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });

            // Create JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user); // Remove unnecessary res.status(500) line
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: 'Email not valid' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Password not valid' });
            }
          
            res.json({ message: 'User logged in successfully', token: user.token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    logoutUser: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            tokenBlacklist.add(token); // Add token to blacklist
            res.json({ message: 'User logged out successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updateUserById: async (req, res) => {
        try {
            const { userId } = req.params;
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            
            const token = jwt.sign({ userId }, process.env.JWT_SECRET);

            res.json({ message: 'Password updated successfully', token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = UserController;
