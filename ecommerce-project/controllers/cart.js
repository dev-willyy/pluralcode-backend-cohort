const Cart = require('../models/cartModel.js');
const { GenericProduct, Car, Shoe } = require('../models/productModel.js');

async function getSingleUserCart(req, res, next) {
  const { id } = req.user;

  try {
    const cart = await Cart.findOne({ user: id }).populate('products.product');
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ success: false, error: `Unable to get cart: ${err.message}` });
  }
}

async function addToCartController(req, res, next) {
  const { productId, quantity } = req.body;
  const user = req.user.id;

  try {
    let cart = await Cart.findOne({ user });
    /**
     * const product =
       (await GenericProduct.findOne({ _id: productId })) ||
       (await Car.findOne({ _id: productId })) ||
       (await Shoe.findOne({ _id: productId }));
     * 
     * const price = product.price;
     * const name = product.name;
     * 
     **/
     

    if (!cart) cart = new Cart({ user, products: [] });

    const existingProduct = cart.products.find((cartProduct) => {
      return cartProduct.product.equals(productId);
    });

    if (existingProduct) existingProduct.quantity += quantity || 1;

    cart.products.push({ product: productId, quantity: quantity || 1 });
    await cart.save();
    res.status(201).json({ success: true, cart });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, error: `Unable to create cart: ${err.message}` });
  }
}

module.exports = { getSingleUserCart, addToCartController };
