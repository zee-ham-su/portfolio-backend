const express = require('express');
const mongoose = require('mongoose');
const app = express();


const PORT = process.env.PORT || 5000;

mongoose.connect('uri')
mongoose.connection.on('connected', () => {
    console.log('DB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
});

app.use(express.json());

app.use(require('./routes/productsRoute'));
app.use('/categories', require('./routes/categoriesRoute'))