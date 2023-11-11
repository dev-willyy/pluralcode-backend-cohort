const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: 'You are not authenticated' });

  jwt.verify(token, process.env.SECRET_TOKEN, (error, user) => {
    if (error) return res.status(401).json({ message: 'Error verifying token' });

    req.token = token;
    req.user = user;
    next();
  });
}

function ordinaryUserVerificationMiddleware(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'You are not authorized' });
    }
  });
}

function adminVerificationMiddleware(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: 'You are not authorized' });
    }
  });
}

module.exports = {
  verifyToken,
  ordinaryUserVerificationMiddleware,
  adminVerificationMiddleware,
};
