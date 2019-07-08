const express = require("express");
const router = express.Router();

const SupplierController = require("../controllers/supplier");

router
  .route("/")
  .get(SupplierController.index)
  .post(SupplierController.newSupplier);

// /:supplerId
router
  .route("/:supplierId")
  .get(SupplierController.getSupplierById)
  .patch(SupplierController.replaceSupplier)
  .put(SupplierController.updateSupplier)
  .delete(SupplierController.deleteSupplier);

router
  .route("/:supplierId/:productId")
  .post(SupplierController.addNewPriceToSupplierProduct);

module.exports = router;
