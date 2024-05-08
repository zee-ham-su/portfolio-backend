const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');

// database connection

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://hamzasufian2014:hZ2j4i93ckRdHBrU@cluster0.ogwdwlq.mongodb.net/My_api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));