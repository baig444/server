const jwt = require('jsonwebtoken');
const secretKey = 'paisenikal'; // Replace with your actual secret key

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Read the token from the cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Login please" });
  }

  jwt.verify(token,secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token & Login please" });
    }

    req.user = decoded; // Store the decoded user information in the request object
    next();
  });
};

module.exports = authMiddleware;