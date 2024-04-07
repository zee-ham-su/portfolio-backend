const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Route to register a new user
router.post('/register', UserController.registerUser);

// Route to login a user
router.post('/login', UserController.loginUser);

// Route to get all users
router.get('/', UserController.getAllUsers);

// Route to get a single user by ID
router.get('/:id', UserController.getUserById);

// Route to update a user by ID
router.put('/:id', UserController.updateUserById);

// Route to delete a user by ID
router.delete('/:id', UserController.deleteUserById);

module.exports = router;
