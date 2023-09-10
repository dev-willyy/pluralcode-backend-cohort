const express = require('express');
const { registerController } = require('../controllers/authController');
const router = express.Router();

// task
router.post('/register', registerController);

module.exports = {
  authRouter: router,
};
