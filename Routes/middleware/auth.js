// server/middleware/auth.js

const jwt = require('jsonwebtoken');
const secretKey = 'abcd';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Get the token from the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Assuming the token format is "Bearer <token>"
  const [, tokenValue] = token.split(' ');

  jwt.verify(tokenValue, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = { userId: decoded.user.username }; // Adjust based on how the user ID is stored
    next();
  });
};

const verifyStudentToken = (req, res, next) => {
    const token = req.headers.authorization; // Get the token from the Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    // Assuming the token format is "Bearer <token>"
    const [, tokenValue] = token.split(' ');
  
    jwt.verify(tokenValue, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      req.user = { userId: decoded.user.username }; // Adjust based on how the user ID is stored
      console.log("in auth.js "+req.user);
      next();
    });
  };

  const verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization; // Get the token from the Authorization header
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    // Assuming the token format is "Bearer <token>"
    const [, tokenValue] = token.split(' ');
  
    jwt.verify(tokenValue, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      req.user = { userId: decoded.user.username }; // Adjust based on how the user ID is stored
      next();
    });
  };

module.exports = { verifyToken,verifyStudentToken,verifyAdminToken };
