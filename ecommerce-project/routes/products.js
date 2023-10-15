const express = require('express');
const { adminVerificationMiddleware } = require('../middlewares/verificationMiddleware.js');
const { createProductController } = require('../controllers/products.js');

const router = new express.Router();

/**
 * Only admins should be able to create products. 
 * So, let's test the createProductController for now
 * Once it is all good. we would include the adminVerificationMiddleware
 */

router.post('/:id', createProductController);
// router.post('/:id', adminVerificationMiddleware, createProductController);

module.exports = { productsRouter: router };
