const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email' ],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password' ],
        minlength: [6, 'minimum password length is 6 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// fire a function before doc saved to db

userSchema.post('save', async function(next) {
    // hash the password before saving the user to the database
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;