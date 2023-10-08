const express = require('express');
const { registerController, loginController } = require('../controllers/auth');
const { validateMiddleware } = require('../middlewares/validateMiddleware');
const { validateUser } = require('../models/userModel');
const router = new express.Router();

// try the second argument with the square braces []
router.post('/register', validateMiddleware(validateUser), registerController);
router.post('/login', loginController);

module.exports = { authRouter: router };
