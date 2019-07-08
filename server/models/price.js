const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  price: { type: Number, required: true },
  supplier: [
    {
      type: Schema.Types.ObjectId,
      ref: "supplier"
    }
  ],
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

PriceSchema.pre("save", function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Price = mongoose.model("price", PriceSchema);
module.exports = Price;
