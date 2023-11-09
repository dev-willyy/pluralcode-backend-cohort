const express = require('express');
const {
  adminVerificationMiddleware,
  ordinaryUserVerificationMiddleware,
} = require('../middlewares/verificationMiddleware.js');
const {
  createProductController,
  getAllProductsController,
  updateSingleProductController,
  getSingleProductController,
	deleteSingleProductController,
} = require('../controllers/products.js');

const router = new express.Router();

router.post('/', adminVerificationMiddleware, createProductController);
router.get('/', ordinaryUserVerificationMiddleware, getAllProductsController);
router.get('/:id', ordinaryUserVerificationMiddleware, getSingleProductController);
router.put('/:id', adminVerificationMiddleware, updateSingleProductController);
router.delete('/:id', adminVerificationMiddleware, deleteSingleProductController);

module.exports = { productsRouter: router };
