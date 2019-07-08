const express = require("express");
const router = express.Router();

const PriceController = require("../controllers/price");

router
  .route("/")
  .get(PriceController.index)
  .post(PriceController.newPrice);

// /:priceId
router
  .route("/:priceId")
  .get(PriceController.getPriceById)
  .patch(PriceController.replacePrice)
  .put(PriceController.updatePrice)
  .delete(PriceController.deletePrice);

module.exports = router;
