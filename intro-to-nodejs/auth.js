const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
  res.send('This is the Register Route');
});

router.post('/login', (req, res) => {
  res.send('This is the Login Route');
});

router.post('/logout', (req, res) => {
  res.send('This is the Logout Route');
});

module.exports = { authRouter: router }; // export router as authRouter
