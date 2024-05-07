const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    quantity: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Electronics', 'Accessories', 'Books', 'Food']
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Category', categorySchema);
