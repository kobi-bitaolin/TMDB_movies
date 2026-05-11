const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require("../validation");

// Registers a new user: validates input, checks for duplicate email,
// hashes the password, and saves the user to the database.
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({ error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send({ user: savedUser._id });
  } catch (error) {
    res.status(400).send({ message: "Error saving user to database" });
  }
});

// Authenticates a user: validates input, verifies the email and password,
// then returns a signed JWT valid for 7 days.
// Returns a generic error message to prevent email enumeration attacks.
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ error: "Invalid credentials" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send({ error: "Invalid credentials" });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
  res.header('auth-token', token);
  res.send({ token, name: user.name });
});

module.exports = router;
