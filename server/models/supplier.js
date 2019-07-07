const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  information: {
    type: String,
    required: false
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Supplier = mongoose.model("supplier", SupplierSchema);

module.exports = Supplier;
