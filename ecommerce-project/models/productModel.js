const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productKind: {
      type: String,
      enum: ['generic', 'car', 'shoe'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const GenericProduct = mongoose.model('Product', productSchema);

const carSchema = new Schema({
  productionYear: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
});

const shoeSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  designPattern: {
    type: String,
    required: true,
  },
});

const Car = GenericProduct.discriminator('Car', carSchema);
const Shoe = GenericProduct.discriminator('Shoe', shoeSchema);

module.exports = {
  GenericProduct,
  Car,
  Shoe,
};
