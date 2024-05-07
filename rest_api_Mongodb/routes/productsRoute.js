const Product = require('../models/Product');
const router = require('express').Router();


router.post('/products', async (req, res) => {
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

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find().select('-__v');
        res.status(200).json(products);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(422).json({ error: 'Invalid product id' });
        }
        const product = await Product.findById(req.params.id).select('-__v');
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(422).json({ error: 'Invalid product id' });
        }

        if (!await Product.exists( {_id: req.params.id})) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true } );
        
        res.json(updatedProduct);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(422).json({ error: 'Invalid product id' });
        }
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        } else {
            await Product.deleteOne()

        return res.status(201).json({ message: 'Product deleted successfully' });
        }
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;