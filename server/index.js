const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true
});

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
const price = require("./routes/price");
const product = require("./routes/product");
const supplier = require("./routes/supplier");
const user = require("./routes/user");

//Routes
app.use("/prices", price);
app.use("/products", product);
app.use("/suppliers", supplier);
app.use("/user", user);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
