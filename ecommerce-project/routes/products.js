const express = require('express');
const { adminVerificationMiddleware } = require('../middlewares/verificationMiddleware.js');
const { createProductController } = require('../controllers/products.js');

const router = new express.Router();

router.post('/:id', adminVerificationMiddleware, createProductController);

module.exports = { productsRouter: router };
