const { GenericProduct, Car, Shoe } = require('../models/productModel.js');

async function createProductController(req, res, next) {
  const { productKind, ...otherProperties } = req.body;

  let productModel;
  let productModelName;
  let product;

  switch (productKind) {
    case 'generic':
      productModel = GenericProduct;
      productModelName = 'Product';
      break;
    case 'car':
      productModel = Car;
      productModelName = 'Car';
      break;
    case 'shoe':
      productModel = Shoe;
      productModelName = 'Shoe';
      break;
    default:
      productModel = undefined;
      productModelName = undefined;
  }

  if (!productModel) {
    console.error('No productModel selected');
    return res.status(400).json({
      error: "valid productKind required. Should either have a value of 'Car' or 'Generic' or 'Shoe'",
    });
  }

  /**
   *
   * Check if lastProduct's Model === incomingProduct's Model
   * if (lastproduct's Model === incomingProduct's Model) return serialNumber + 1;
   * else return lastProduct's serialNumber + 1 {using the lastProduct's model} ✅
   *
   * As for the Seperate Collection issue:
   * Each Products based on their productKind has been nested within seperate Array defined for them
   * However, all the three product categories will remain within the same collection since MongoDB does not support sub-collections natively ✅
   *
   **/

  const autoGenerateSerialNumber = async () => {
    const count = await productModel.countDocuments({ constructor: { modelName: productModelName } });

    if (count > 0) {
      const lastProduct = await productModel.findOne(
        { constructor: { modelName: productModelName } },
        {},
        { sort: { serialNumber: -1 } }
      );
      const { serialNumber } = lastProduct._doc;
      return serialNumber + 1;
    }

    return 1;
  };

  const serialNumber = await autoGenerateSerialNumber();

  try {
    switch (productKind) {
      case 'generic':
        product = new GenericProduct({ serialNumber, productKind, ...otherProperties });
        break;
      case 'car':
        product = new Car({ serialNumber, productKind, ...otherProperties });
        break;
      case 'shoe':
        product = new Shoe({ serialNumber, productKind, ...otherProperties });
        break;
      default:
        product = undefined;
    }

    if (product) {
      await product.save();
      return res.status(201).json({ message: 'Product created successfully!', product });
    }
    throw new Error("valid productKind required. Should either have a value of 'Car' or 'Generic' or 'Shoe'");
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({ error: err.message });
  }
}

async function getSingleProductController(req, res, next) {
  const { id } = req.params;

  try {
    const product =
      (await GenericProduct.findOne({ _id: id, productKind: 'generic' })) ||
      (await Car.findOne({ _id: id })) ||
      (await Shoe.findOne({ _id: id }));

    res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    return res.status(404).send(err.message);
  }
}

async function deleteSingleProductController(req, res, next) {
  const { id } = req.params;

  try {
    (await GenericProduct.findByIdAndDelete({ _id: id, productKind: 'generic' })) |
      (await Car.findByIdAndDelete({ _id: id })) |
      (await Shoe.findByIdAndDelete({ _id: id }));

    res.status(200).json({ message: 'Product successfully deleted' });
  } catch (err) {
    console.error(err.message);
    return res.status(404).send(err.message);
  }
}

async function updateSingleProductController(req, res, next) {
  const { ...updatedProductDetails } = req.body;
  const { id } = req.params;

  if (Object.keys(updatedProductDetails).length === 0 || Object.values(updatedProductDetails).length === 0)
    return res.status(400).json({
      message: 'Data to be updated must be passed',
    });

  try {
    const updatedProduct =
      (await GenericProduct.findByIdAndUpdate({ _id: id }, { ...updatedProductDetails }, { new: true })) ||
      Car.findByIdAndUpdate({ _id: id }, { ...updatedProductDetails }, { new: true }) ||
      Shoe.findByIdAndUpdate({ _id: id }, { ...updatedProductDetails }, { new: true });
    return res.status(200).json(updatedProduct._doc);
  } catch (err) {
    console.error('Error updating product: ', err);
  }
}

async function getAllProductsController(req, res, next) {
  const genericProducts = await GenericProduct.find({ productKind: 'generic' });
  const carProducts = await Car.find({});
  const shoeProducts = await Shoe.find({});

  try {
    res.status(200).json({ genericProducts, carProducts, shoeProducts });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ error: err });
  }
}

module.exports = {
  createProductController,
  getAllProductsController,
  getSingleProductController,
  deleteSingleProductController,
  updateSingleProductController,
};
