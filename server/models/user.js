const mongoose = require('mongoose');

// One movie entry on a user's wishlist. _id disabled so the TMDB movie id
// (stored in `id`) is the only identifier.
const wishlistItemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: String,
    overview: String,
    poster_path: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  wishlist: {
    type: [wishlistItemSchema],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', userSchema);
