const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/', (req, res) => {
    console.log(req.body);
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});