const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 3000;
const uri = "mongodb+srv://hamzasufian2014:hZ2j4i93ckRdHBrU@cluster0.ogwdwlq.mongodb.net/auth_node";

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// View engine
app.set('view engine', 'ejs');

// Database connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })

  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    // Handle error appropriately, e.g., retry connection or terminate the application
  });

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

app.use('/api', authRoutes);


// cookies

app.get('/set-cookies', (req, res) => {
  
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 3000 });
  res.send('you got the cookie!')
});

app.get('/read-cookies', (req, res) => {

});