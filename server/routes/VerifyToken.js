const jwt = require('jsonwebtoken');

// Middleware that protects routes by verifying a JWT.
// Accepts the token from either the Authorization: Bearer header or the auth-token header.
// Attaches the decoded user payload to req.user and calls next() on success.
module.exports = function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = (authHeader && authHeader.split(' ')[1]) || req.header('auth-token');

  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
