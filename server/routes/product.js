const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product");

router
  .route("/")
  .get(ProductController.index)
  .post(ProductController.newProduct);

// /:productId
router
  .route("/:productId")
  .get(ProductController.getProductById)
  .put(ProductController.updateProduct)
  .patch(ProductController.replaceProduct);
module.exports = router;
