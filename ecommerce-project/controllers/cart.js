const Cart = require('../models/cartModel.js');
const { GenericProduct, Car, Shoe } = require('../models/productModel.js');

async function getCartController(req, res, next) {
  const { id } = req.user;

  try {
    const cart = await Cart.findOne({ owner: id }).populate('products.product');
    return res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({
      success: false,
      error: `Unable to get cart: ${err.message}`,
    });
  }
}

async function addToCartController(req, res, next) {
  const { productId, quantity } = req.body;
  const owner = req.user.id;

  console.log({ productId }, typeof productId);

  try {
    const cart = await Cart.findOne({ owner });
    const product =
      (await GenericProduct.findOne({ _id: productId, productKind: 'generic' })) ||
      (await Car.findOne({ _id: productId })) ||
      (await Shoe.findOne({ _id: productId }));

    if (!product) {
      res.status(404).send({ message: 'Product not found' });
      return;
    }

    const { name, price } = product;

    if (!cart) {
      const newCart = await Cart.create({
        owner,
        products: [{ product: productId, name, quantity }],
        bill: quantity * price,
      });
      return res.status(201).send(newCart);
    }

    const productIndex = cart.products.findIndex((product) => {
      product.product.equals(productId);
    });
    console.log({ productIndex });

    if (productIndex > -1) {
      let cartProduct = cart.products[productIndex];
      cartProduct.quantity += quantity;
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * price;
      }, 0);
      cart.products[productIndex] = cartProduct;

      await cart.save();
      return res.status(200).json({ cart });
    } else {
      cart.products.push({ product: productId, name, quantity });
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * price;
      }, 0);

      await cart.save();
      return res.status(200).send({ cart });
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      success: false,
      error: `Unable to create cart: ${err.message}`,
    });
  }
}

async function deleteProductFromCartController(req, res, next) {
  const owner = req.user.id;
  const { productId } = req.params;
  console.log({ productId }, typeof productId);

  try {
    let cart = await Cart.findOne({ owner });
    console.log({ owner });

    const productIndex = cart.products.findIndex((product) => {
      return product.product.equals(productId);
    });
    console.log({ productIndex });

    if (productIndex > -1) {
      let cartProduct = cart.products[productIndex];

      cart.bill -= cartProduct.quantity * cartProduct.price;
      if (cart.bill < 0) cart.bill = 0;
      cart.products.splice(productIndex, 1);
      cart.bill = cart.products.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
      }, 0);

      cart = await cart.save();
      return res.status(200).json({ cart });
    } else {
      return res.status(404).json('Product not found');
    }
  } catch (err) {
    console.error(err.message);
    return res.status(400).json();
  }
}

module.exports = { getCartController, addToCartController, deleteProductFromCartController };
