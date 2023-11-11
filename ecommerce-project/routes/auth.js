const express = require('express');
const { registerController, loginController, logoutController } = require('../controllers/auth.js');
const { validateMiddleware } = require('../middlewares/validateMiddleware.js');
const { validateUserReg, validateUserLogin } = require('../models/userModel.js');
const { verifyToken } = require('../middlewares/verificationMiddleware.js');

const router = new express.Router();

router.post('/register', validateMiddleware(validateUserReg), registerController);
router.post('/login', validateMiddleware(validateUserLogin), loginController);
router.post('/logout', verifyToken, logoutController);

module.exports = { authRouter: router };
