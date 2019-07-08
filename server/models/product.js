const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  information: { type: String, required: true },
  image: { type: String, required: false },
  rating: { type: Number, required: true },
  prices: [
    {
      type: Schema.Types.ObjectId,
      ref: "price"
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

ProductSchema.pre("save", function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;
