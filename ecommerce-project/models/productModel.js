const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productKind: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          const lowerCaseValue = value.toLowerCase();
          return ['generic', 'car', 'shoe'].includes(lowerCaseValue);
        },
        message: (props) => `${props.value} is not a valid product kind. Valid options are: generic, car, shoe`,
      },
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
