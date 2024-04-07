// server.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require('./mong.db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error starting server:', error.message);
  });
