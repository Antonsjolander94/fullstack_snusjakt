const Product = require("../models/product");

module.exports = {
  index: async (req, res, next) => {
    await Product.find({}, (err, products) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(products);
      }
    }).populate({
      path: "prices",
      populate: {
        path: "supplier"
      }
    });
  },
  getProductById: async (req, res, next) => {
    const productId = req.params.productId;

    await Product.findById(productId, async (err, product) => {
      if (err) {
        next(err);
      } else {
        product.rating++;
        await product.save();
        res.status(200).json(product);
      }
    });
  },
  newProduct: async (req, res, next) => {
    try {
      const newProduct = new Product(req.body);
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },
  replaceProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const newProduct = req.body;
      const result = await Product.findByIdAndUpdate(productId, newProduct);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { productId } = req.params;
      const newProduct = req.body;
      const result = await Product.findByIdAndUpdate(productId, newProduct);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
};
