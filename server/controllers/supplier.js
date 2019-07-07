const Supplier = require("../models/supplier");
const Product = require("../models/product");
const asyncHandler = require("express-async-handler");

module.exports = {
  index: asyncHandler(async (req, res, next) => {
    await Supplier.find({}, (err, suppliers) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(suppliers);
      }
    });
  }),
  newSupplier: asyncHandler(async (req, res, next) => {
    await Supplier.create(req.body, (err, supplier) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json(supplier);
      }
    });
  }),
  getSupplier: asyncHandler(async (req, res, next) => {
    const { supplierId } = req.params;

    await Supplier.findById(supplierId, (err, supplier) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(supplier);
      }
    });
  }),
  replaceSupplier: asyncHandler(async (req, res, next) => {
    // Must contain all fields in order to work.
    const { supplierId } = req.params;
    const newSupplier = req.body;

    await Supplier.findByIdAndUpdate(
      (supplierId, newSupplier),
      (err, supplier) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json(supplier);
        }
      }
    );
  }),
  updateSupplier: asyncHandler(async (req, res, next) => {
    // May contain any field in order to work.
    const { supplierId } = req.params;
    const newSupplier = req.body;

    await Supplier.findByIdAndUpdate(
      (supplierId, newSupplier),
      (err, supplier) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json(supplier);
        }
      }
    );
  }),
  deleteSupplier: asyncHandler(async (req, res, next) => {
    // Delete Supplier
    const { supplierId } = req.params;

    await Supplier.findByIdAndDelete(supplierId, err => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ success: true });
      }
    });
  }),
  getSupplierProducts: asyncHandler(async (req, res, next) => {
    // Get Supplier Products
    const { supplierId } = req.params;

    const supplier = await Supplier.findById(supplierId).populate("products");
    res.status(200).json(supplier.products);
  }),
  newSupplierProduct: asyncHandler(async (req, res, next) => {
    // Create a new Supplier Product
    const { supplierId } = req.params;
    const newProduct = new Product(req.body);
    const supplier = await Supplier.findById(supplierId).populate("products");
    newProduct.suppliers = supplier;
    await newProduct.save();
    //Add product to the suppliers array "products"
    supplier.products.push(newProduct);
    // Save Supploer
    await supplier.save();
    res.status(201).json(supplier);
  })
};
