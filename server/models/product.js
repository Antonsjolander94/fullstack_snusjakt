const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  ranking: {
    type: Number,
    required: true
  },
  categories: [{ type: Schema.Types.ObjectId, ref: "category" }],
  suppliers: [{ type: Schema.Types.ObjectId, ref: "supplier" }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

// Getter
ProductSchema.path("price").get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
ProductSchema.path("price").set(function(num) {
  return num * 100;
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
