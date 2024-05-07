const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
        required: true
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model('Product', productSchema);