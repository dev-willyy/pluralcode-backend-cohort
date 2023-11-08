const express = require('express');
const { adminVerificationMiddleware } = require('../middlewares/verificationMiddleware.js');
const { createProductController, createProduct } = require('../controllers/products.js');

const router = new express.Router();

// router.post('/:id', adminVerificationMiddleware, createProductController);
router.post('/:id', createProduct);

module.exports = { productsRouter: router };
