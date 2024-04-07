const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Controller actions

const UserController = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();

            // Create JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            res.status(201).json({ message: 'User registered successfully', token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get a single user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
            res.status(500).json({ error: 'Internal server error' });
        } catch (error) {
        }
    },

// Login user
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            console.log(email, password, user);

            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log(isPasswordValid);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }
            console.log(process.env.JWT_SECRET);

            // Return existing JWT token generated during registration
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,);


            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Update a user by ID
    updateUserById: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a user by ID
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

// Export controller methods
module.exports = UserController;
