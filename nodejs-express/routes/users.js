const express = require('express');
const { getUsersController, getSingleUserController } = require('../controllers/usersController');
const router = new express.Router();

router.get('/', getUsersController);
router.get('/:id', getSingleUserController)

module.exports = { usersRouter: router };
