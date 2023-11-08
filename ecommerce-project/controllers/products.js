const { productModel, GenericProduct, Car, Shoe } = require('../models/productModel.js');

/**
 *  we can have multiple units of the same product
 *  so, we check (if a product serialNumber already exists in the db)
 *	serialNumber has to increment from 1
 *  Also return different responses to client based on productType
 *
 *  if (incoming serialNumber is > lastProduct's serialNumber + 1) return `Serial number must be lastProduct.serialNumber + 1`;
 *
 *  I'll do some explanations when we meet during the week
 *
 *  Switch Model based on the productKind coming from req.body
 *  {find another way of implementing this so that the pre middleware can run}
 *  Return a response message to the admin if (!productKind)
 */

async function createProduct(req, res, next) {
  const { productKind, ...otherProperties } = req.body;

  let product;

  switch (productKind.toLowerCase()) {
    case 'generic':
      product = new GenericProduct({ productKind, ...otherProperties });
      break;
    case 'car':
      product = new Car({ productKind, ...otherProperties });
      break;
    case 'shoe':
      product = new Shoe({ productKind, ...otherProperties });
      break;
    default:
      return res.status(400).json({ message: 'Invalid productKind' });
  }

  try {
    await product.save();
    res.status(201).json({ message: 'Product created successfully!' });
  } catch (err) {
    console.error(err);
  }
}

async function createProductController(req, res, next) {
  const { serialNumber, ...otherProperties } = req.body;

  if (!productKind)
    return res.status(401).json({
      message: `productKind field is required`,
    });

  function switchModel() {
    if (productKind.toLowerCase() === 'generic') return productModel;
    if (productKind.toLowerCase() === 'shoe') return Shoe;
    if (productKind.toLowerCase() === 'car') return Car;

    res.status(403).json({
      message: `productKind must either be generic or shoe or car`,
    });
    throw new Error('Error switching product model');
  }

  try {
    const productModel = switchModel();
    const productWithSerialNumber = await productModel.findOne({ serialNumber });
    const lastProduct = await productModel.findOne({}, {}, { sort: { serialNumber: -1 } });

    if (productWithSerialNumber)
      return res.status(409).json({
        message: `Product with serialNumber: ${serialNumber} already exists. Try ${lastProduct.serialNumber + 1}
    `,
      });

    const generateSerialNumber = () => {
      if (!lastProduct) return 1;
      if (serialNumber > lastProduct.serialNumber + 1) {
        res.status(405).json({ message: `SerialNumber not allowed. must be ${lastProduct.serialNumber + 1}` });
        throw new Error('Error with serialNumber field');
      }
      return serialNumber;
    };

    const newGenericProduct = new productModel({
      serialNumber: generateSerialNumber(),
      ...otherProperties,
    });
    await newGenericProduct.save();
    res.status(201).json({ message: 'New generic product successfully created' });
  } catch (err) {
    console.error('productCreationError: ', err.message);
  }
}

module.exports = { createProductController, createProduct };
