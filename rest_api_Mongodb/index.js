const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json('Welcome to my REST API server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});