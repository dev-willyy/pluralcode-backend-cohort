const Order = require('../models/orderModel.js');

async function getUserOrdersController(req, res, next) {
  const userId = req.user._id;

  try {
    const orders = await Order.find({ user: userId }).populate('products.product');
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

async function placeOrderController(req, res, next) {
  const userId = req.user._id;
  const { products, totalAmount } = req.body;

  try {
    const order = new Order({ user: userId, products, totalAmount });
    await order.save();

    return res.status(201).json({ success: true, order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

module.exports = { getUserOrdersController, placeOrderController };
