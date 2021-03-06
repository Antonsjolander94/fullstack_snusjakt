const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  information: { type: String, required: true },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

SupplierSchema.pre("save", function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Supplier = mongoose.model("supplier", SupplierSchema);
module.exports = Supplier;
