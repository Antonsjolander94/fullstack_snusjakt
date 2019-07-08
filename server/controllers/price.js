const Price = require("../models/price");

module.exports = {
  index: async (req, res, next) => {
    await Price.find({}, (err, prices) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(prices);
      }
    });
  },
  newPrice: async (req, res, next) => {
    try {
      const newPrice = new Price(req.body);
      const price = await newPrice.save();
      res.status(201).json(price);
    } catch (error) {
      next(error);
    }
  },
  getPriceById: async (req, res, next) => {
    const priceId = req.params.priceId;

    await Price.findById(priceId, async (err, product) => {
      if (err) {
        next(err);
      } else {
        product.rating++;
        await product.save();
        res.status(200).json(product);
      }
    });
  },
  replacePrice: async (req, res, next) => {
    try {
      const { priceId } = req.params;
      const newPrice = req.body;
      await Price.findByIdAndUpdate(priceId, newPrice);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
  updatePrice: async (req, res, next) => {
    try {
      const { priceId } = req.params;
      const newPrice = req.body;
      await Price.findByIdAndUpdate(priceId, newPrice);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  },
  deletePrice: async (req, res, next) => {
    try {
      const { priceId } = req.params;
      await Price.findByIdAndDelete(priceId);
      res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }
};
