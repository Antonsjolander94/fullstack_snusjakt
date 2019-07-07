const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Category model example...
// {_id: 1, name: "Allt", parentId: 0, idPath: "/0/1/", products: [...]}
// {_id: 2, name: "Lössnus", parentId: 1, idPath: "/0/1/2/", products: [...]}
// {_id: 3, name: "Vit Snus", parentId: 1, idPath: "/0/1/3/", products: [...]}

const CategorySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  parentId: {
    type: Number,
    required: [true, "parentID is required"]
  },
  idPath: {
    type: String,
    required: [true, "idPath is required"]
  },
  products: [{ type: Schema.Types.ObjectId, ref: "product" }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Category = mongoose.model("category", CategorySchema);

module.exports = Category;
