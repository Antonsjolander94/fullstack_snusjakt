const express = require("express");
const router = express.Router();

const SupplierController = require("../controllers/supplier");

router
  .route("/")
  .get(SupplierController.index)
  .post(SupplierController.newSupplier);

// /suppliers/:id
router
  .route("/:supplierId")
  .get(SupplierController.getSupplier)
  .put(SupplierController.replaceSupplier)
  .patch(SupplierController.updateSupplier)
  .delete(SupplierController.deleteSupplier);

router
  .route("/:supplierId/products")
  .get(SupplierController.getSupplierProducts)
  .post(SupplierController.newSupplierProduct);

module.exports = router;
