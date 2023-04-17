const jwt = require('jsonwebtoken');
const config = require('../config/config');
function auth(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
        message: 'Authorization token not found' });
  }
  try {
      const decoded = jwt.verify(token, config.jwt.secret);
      req.userId = decoded.userId;
      next();
      }
  catch (err) {
      res.status(400).json({ message: err.message });
  }
}

module.exports = auth;