const Supplier = require("../models/supplier");
const Product = require("../models/product");
const Price = require("../models/price");

module.exports = {
  index: async (req, res, next) => {
    await Supplier.find({}, (err, suppliers) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(suppliers);
      }
    });
  },
  getSupplierById: async (req, res, next) => {
    const supplierId = req.params.supplierId;

    await Supplier.findById(supplierId, (err, supplier) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(supplier);
      }
    });
  },
  newSupplier: async (req, res, next) => {
    try {
      const newSupplier = new Supplier(req.body);
      const supplier = await newSupplier.save();
      res.status(201).json(supplier);
    } catch (error) {
      next(error);
    }
  },
  addNewPriceToSupplierProduct: async (req, res, next) => {
    try {
      //Check if exist
      const supplierId = req.params.supplierId;
      const productId = req.params.productId;
      const supplier = await Supplier.findById(supplierId);
      const product = await Product.findById(productId);

      if (supplier && product) {
        const newPrice = new Price(req.body);

        newPrice.supplier = supplier;
        newPrice.product = product;

        await newPrice.save();
        product.prices.push(newPrice);
        await product.save();
        res.status(201).json(newPrice);
      }

      console.log(supplier, product);

      // const newProduct = new Product(req.body);

      // const supplier = await Supplier.findById(supplierId);

      // newProduct.suppliers = supplier;
    } catch (error) {
      console.log(error);
    }
  },
  replaceSupplier: async (req, res, next) => {
    try {
      const { supplierId } = req.params;
      const newSupplier = req.body;
      await Supplier.findByIdAndUpdate(supplierId, newSupplier);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
  updateSupplier: async (req, res, next) => {
    try {
      const { supplierId } = req.params;
      const newSupplier = req.body;
      await Supplier.findByIdAndUpdate(supplierId, newSupplier);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
  deleteSupplier: async (req, res, next) => {
    try {
      const { supplierId } = req.params;
      await Supplier.findByIdAndDelete(supplierId);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
};
