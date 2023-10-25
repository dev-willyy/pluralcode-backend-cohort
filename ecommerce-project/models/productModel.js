const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Add productKind to genericSchema
 * Use/Enforce only either of these 'Generic' || 'Shoe' || 'Car' as the value of productKind,
 * and any lettercase should be allowed
 */

const genericSchema = new Schema(
  {
    productKind: {
      type: String,
      enum: ['Generic', 'Shoe', 'Car'],
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

genericSchema.pre('validate', (next) => {
  if (this.productKind) {
    this.productKind === this.productKind.toLowerCase();
  }
  return next();
});

const genericSchemaConfig = new Schema(genericSchema, {
  discriminatorKey: 'productKind',
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

const carSchema = new Schema({
  productionYear: {
    type: String,
    required: true,
  },
});

/**
 * Switch Model based on the productKind field
 * return only one model from a pickModel function
 * default export should be the return value of the pickModel function
 */
const GenericProduct = mongoose.model('product', genericSchemaConfig);
const Shoe = GenericProduct.discriminator('Shoe', shoeSchema);
const Car = GenericProduct.discriminator('Car', carSchema);

module.exports = { GenericProduct, Shoe, Car };
