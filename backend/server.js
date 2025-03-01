require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const Cart = require("./Model/Cart");
const Product = require("./Model/Product");

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
const cartRoute = require("./routes/cartRoute");
const productRoute = require("./routes/productRoute");

app.use("/cart", cartRoute);
app.use("/product", productRoute);
app.use("/images/hero", express.static("public/images/hero"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
