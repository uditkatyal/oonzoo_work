const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
} = require("../controllers/productsControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/createProduct").post(protect, createProduct);
router.route("/allProducts").get(protect, getAllProducts);

module.exports = router;
