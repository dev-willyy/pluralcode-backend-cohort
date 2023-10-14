const express = require('express');
const { registerController, loginController } = require('../controllers/auth.js');
const { validateMiddleware } = require('../middlewares/validateMiddleware.js');
const { validateUserReg, validateUserLogin } = require('../models/userModel.js');

const router = new express.Router();

router.post('/register', validateMiddleware(validateUserReg), registerController);
router.post('/login', validateMiddleware(validateUserLogin), loginController);

module.exports = { authRouter: router };
