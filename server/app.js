// Load environment variables before any other module reads process.env
require('dotenv').config();

const express = require('express');
const connectDB = require('./connectdb');

const app = express();
const PORT = process.env.PORT || 5001;

// Parses incoming JSON request bodies
app.use(express.json());

// Establishes the MongoDB connection
connectDB();

// Mounts auth routes (register, login) under /api/user
app.use("/api/user", require("./routes/auth"));
app.use("/api/user/wishlist", require("./routes/wishlist"));
app.use("/api/movies", require("./routes/movies"));

// Starts the HTTP server on the configured port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
