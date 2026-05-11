const router = require("express").Router();
const User = require("../models/user");
const verifyToken = require("./VerifyToken");

// All routes require a valid JWT. req.user._id comes from VerifyToken.

router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("wishlist");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.wishlist);
  } catch (err) {
    console.error("Wishlist GET error:", err);
    res.status(500).json({ error: "Failed to load wishlist" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { id, title, overview, poster_path } = req.body;
  if (typeof id !== "number") {
    return res.status(400).json({ error: "Movie id is required" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.wishlist.some((item) => item.id === id)) {
      return res.status(409).json({ error: "Movie already in wishlist" });
    }

    user.wishlist.push({ id, title, overview, poster_path });
    await user.save();
    res.status(201).json(user.wishlist);
  } catch (err) {
    console.error("Wishlist POST error:", err);
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const movieId = Number(req.params.id);
  if (Number.isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid movie id" });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.wishlist = user.wishlist.filter((item) => item.id !== movieId);
    await user.save();
    res.json(user.wishlist);
  } catch (err) {
    console.error("Wishlist DELETE error:", err);
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
});

module.exports = router;
