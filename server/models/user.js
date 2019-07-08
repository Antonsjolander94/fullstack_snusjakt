const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_at: { type: Date, default: Date.now },
  updated_at: Date
});

userSchema.pre("save", function(next) {
  var currentDate = new Date();
  this.updated_at = currentDate;
  if (!this.created_at) this.created_at = currentDate;
  next();
});

module.exports = mongoose.model("User", userSchema);
