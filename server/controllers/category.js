const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

module.exports = {
  index: asyncHandler(async (req, res, next) => {
    await Category.find({}, (err, categories) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(categories);
      }
    });
  }),
  newCategory: asyncHandler(async (req, res, next) => {
    await Category.create(req.body, (err, category) => {
      if (err) {
        next(err);
      } else {
        res.status(201).json(category);
      }
    });
  }),
  deleteCategory: asyncHandler(async (req, res, next) => {
    // Delete Category
    const { categoryId } = req.params;

    await Category.findByIdAndDelete(categoryId, err => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ success: true });
      }
    });
  })
};
