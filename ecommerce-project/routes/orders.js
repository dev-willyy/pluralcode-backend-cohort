const express = require('express');
const { getUserOrdersController, placeOrderController } = require('../controllers/orders.js');
const { ordinaryUserVerificationMiddleware } = require('../middlewares/verificationMiddleware.js');
const router = new express.Router();

router.get('/', ordinaryUserVerificationMiddleware, getUserOrdersController);
router.post('/:id', ordinaryUserVerificationMiddleware, placeOrderController);

module.exports = { orderRouter: router };
