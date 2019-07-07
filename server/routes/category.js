const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category");

router
  .route("/")
  .get(CategoryController.index)
  .post(CategoryController.newCategory);

// /category/:id
router.route("/:categoryId").delete(CategoryController.deleteCategory);
// .get(CategoryController.getCategory)
// .put(CategoryController.replaceCategory)
// .patch(CategoryController.updateCategory)

module.exports = router;
