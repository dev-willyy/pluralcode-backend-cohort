const { GenericProduct } = require('../models/productModel.js');

/**
 *  we can have multiple units of the same product
 *  so, we check (if a product serialNumber already exists in the db)
 *	serialNumber has to has increment from 1
 *  Also return different responses to client based on productType
 *
 *  if (incoming serialNumber is > lastProduct's serialNumber + 1) return `Serial number must be lastProduct.serialNumber + 1`;
 *
 *  I'll do some explanations when we meet during the week
 */

async function createProductController(req, res, next) {
  const { serialNumber, ...otherProperties } = req.body;

  try {
    const existingProduct = await GenericProduct.findOne({ serialNumber });

    if (existingProduct)
      return res.status(409).json({
        message: `Product with serialNumber: ${serialNumber} already exists
    `,
      });

    const lastProduct = await GenericProduct.findOne({}, {}, { sort: { serialNumber: -1 } });
    const generateSerialNumber = () => {
      if (!lastProduct) return 1;
      if (serialNumber > lastProduct.serialNumber + 1) {
        res.status(405).json({ message: `SerialNumber not allowed. must be ${lastProduct.serialNumber + 1}` });
        throw new Error('Error with serialNumber field');
      }
      return serialNumber;
    };

    const newGenericProduct = new GenericProduct({
      serialNumber: generateSerialNumber(),
      ...otherProperties,
    });
    await newGenericProduct.save();
    res.status(201).json({ message: 'New generic product successfully created' });
  } catch (err) {
    console.error('Error creating new product: ', err);
  }
}

module.exports = { createProductController };
