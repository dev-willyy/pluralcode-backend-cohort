const express = require('express');
const { getUsersController } = require('../controllers/usersController');
const router = new express.Router();

router.get('/', getUsersController);

module.exports = { usersRouter: router };
