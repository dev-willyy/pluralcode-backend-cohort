const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const cartSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
          required: true,
        },
        name: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = model('Cart', cartSchema);

module.exports = Cart;
