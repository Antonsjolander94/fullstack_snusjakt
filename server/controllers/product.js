const Supplier = require("../models/supplier");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

/**
 * Todo
 *
 * - Update Product Ranking property by one when visited.
 */

module.exports = {
  index: asyncHandler(async (req, res, next) => {
    await Product.find({}, (err, products) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(products);
      }
    });
  }),
  newProduct: asyncHandler(async (req, res, next) => {
    await Product.create(req.body, (err, product) => {
      if (err) {
        next(err);
      } else {
        product.created = Date.now();
        res.status(201).json(product);
      }
    });
  }),
  getProduct: asyncHandler(async (req, res, next) => {
    const { productId } = req.params;

    await Product.findById(productId, (err, product) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(product);
      }
    });
  }),
  replaceProduct: asyncHandler(async (req, res, next) => {
    // Must contain all fields in order to work.
    const { productId } = req.params;
    const newProduct = req.body;
    const response = await Product.findByIdAndUpdate(productId, newProduct);
    response.updated = Date.now();
    res.status(200).json(response);
  }),
  updateProduct: asyncHandler(async (req, res, next) => {
    // May contain any field in order to work.

    const { productId } = req.params;
    const newProduct = req.body;
    const response = await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json(response);
  }),
  deleteProduct: asyncHandler(async (req, res, next) => {
    // Delete Product
    const { productId } = req.params;

    await Product.findByIdAndDelete(productId, err => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ success: true });
      }
    });
  }),
  getProductSuppliers: asyncHandler(async (req, res, next) => {
    // Get Product Suppliers
    const { productId } = req.params;

    const product = await Product.findById(productId).populate("suppliers");
    res.status(200).json(product.suppliers);
  }),
  newProductSupplier: asyncHandler(async (req, res, next) => {
    // Create a new Supplier Product
    const { productId } = req.params;
    const newSupplier = new Supplier(req.body);
    const product = await Product.findById(productId).populate("suppliers");
    newSupplier.products = product;
    await newSupplier.save();
    //Add product to the suppliers array "products"
    product.suppliers.push(newSupplier);
    // Save Supploer
    await product.save();
    res.status(201).json(product);
  })
};
