const mongoose = require('mongoose');
// Joi validation is redundant. Skip it.

const genericSchema = new mongoose.Schema(
  {
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

const genericSchemaConfig = new mongoose.Schema(genericSchema, {
  discriminatorKey: 'productKind',
});

const shoeSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  designPattern: {
    type: String,
    required: true,
  },
});

const carSchema = new mongoose.Schema({
  productionYear: {
    type: String,
    required: true,
  },
});

const GenericProduct = mongoose.model('product', genericSchemaConfig);
const Shoe = genericSchemaConfig.discriminator('Shoe', shoeSchema);
const Car = genericSchemaConfig.discriminator('Car', carSchema);

module.exports = { GenericProduct, Shoe, Car };
