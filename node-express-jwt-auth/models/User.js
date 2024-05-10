const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email' ],
        unique: true,
        lowercase: true,
        validate: [(val) => {  }, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password' ],
        miniLength: [6, 'minimum password length is 6 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;