const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());

connectDB();

// mounting
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
