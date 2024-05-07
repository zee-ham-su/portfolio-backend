const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const app = express();

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://hamzasufian2014:hZ2j4i93ckRdHBrU@cluster0.ogwdwlq.mongodb.net/My_api')
mongoose.connection.on('connected', () => {
    console.log('DB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
});

app.use(express.json());

app.post('/products', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ error: 'Name field is required' });
        }

        if (!req.body.price) {
            return res.status(400).json({ error: 'price field is required' });
        }

        if (!req.body.category) {
            return res.status(400).json({ error: 'category field is required' });
        } else if (!Product.schema.path('category').enumValues.includes(req.body.category)) {
            return res.status(400).json({ error: 'Invalid category' });
        }
        const newProduct = await Product.create(req.body)
        return res.status(201).json(newProduct);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find().select('-__v');
        res.status(200).json(products);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).select('-__v');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});