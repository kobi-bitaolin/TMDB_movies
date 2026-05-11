// Load environment variables before any other module reads process.env
require('dotenv').config();

const express = require('express');
const path = require('path');
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

// --- Production-only: serve the built React app from the same host ---
// In development the React dev server (:3000) handles the client and proxies
// /api/* to :5001 via the "proxy" field in client/package.json. In production
// the client is a static bundle; Express serves it directly so the client
// and API live on a single URL (e.g. yourapp.onrender.com).
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'client', 'build');

  // Serve static assets (JS bundles, CSS, images) from client/build.
  app.use(express.static(buildPath));

  // Catch-all: any request that didn't match an /api route returns the
  // React app's index.html so React Router can handle the URL on the client.
  // Must be registered AFTER all /api routes or it would swallow them.
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// Starts the HTTP server on the configured port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
