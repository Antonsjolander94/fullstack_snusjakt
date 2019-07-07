const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product");

router
  .route("/")
  .get(ProductController.index)
  .post(ProductController.newProduct);

// /products/:id
router
  .route("/:productId")
  .get(ProductController.getProduct)
  .put(ProductController.replaceProduct)
  .patch(ProductController.updateProduct)
  .delete(ProductController.deleteProduct);

router
  .route("/:productId/suppliers")
  .get(ProductController.getProductSuppliers)
  .post(ProductController.newProductSupplier);

module.exports = router;
