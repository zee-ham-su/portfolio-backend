# Blogging Platform Backend

## Introduction

This documentation provides an overview of the backend for my blogging platform. The backend is responsible for managing users, blog posts, comments, and authentication.
This is a simple blog post app built with Node.js, Express.js, and MongoDB Atlas.

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js (version 20.5.0)
- MongoDB Atlas account

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/zee-ham-su/portfolio-backend.git
    ```

2. Install the dependencies:

    ```bash
    cd Blog
    npm install
    ```

3. Configure the MongoDB Atlas connection:

    - Create a `.env` file in the root directory.
    - Add the following environment variables:

      ```plaintext
      MONGODB_URI=your-mongodb-atlas-uri
      JWT_SECRET=your jwt secret key here
      PORT=port number
      ```

4. Start the server:

    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:8000` to access the app.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete blog posts
- Comment on blog posts

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).