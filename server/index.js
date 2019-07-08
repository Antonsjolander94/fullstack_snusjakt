const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb://apax94:Extra112!@ds217976.mlab.com:17976/fullstack_snusjakt",
  {
    useNewUrlParser: true
  }
);

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
const price = require("./routes/price");
const product = require("./routes/product");
const supplier = require("./routes/supplier");

//Routes
app.use("/prices", price);
app.use("/products", product);
app.use("/suppliers", supplier);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
