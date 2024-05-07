const express = require('express');
const mongoose = require('mongoose');
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

app.use(require('./routes/productsRoute'));