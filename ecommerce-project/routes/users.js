const express = require('express');
const { ordinaryUserVerificationMiddleware, adminVerificationMiddleware } = require('../middlewares/verificationMiddleware.js');
const {
  getSingleUserController,
  deleteSingleUserController,
  updateSingleUserController,
	getAllUsersController,
} = require('../controllers/users.js');

const router = new express.Router();

router.get('/:id', ordinaryUserVerificationMiddleware, getSingleUserController);
router.patch('/:id', ordinaryUserVerificationMiddleware, updateSingleUserController);
router.delete('/:id', ordinaryUserVerificationMiddleware, deleteSingleUserController);
router.get('/', adminVerificationMiddleware, getAllUsersController);

module.exports = { usersRouter: router };
