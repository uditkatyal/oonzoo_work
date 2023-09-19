const Product = require("../model/productModel");
exports.createProduct = async (req, res) => {
  console.log("product invoked");
  try {
    const { name, description, price } = req.body;

    // const product = await Product.create()
    // or we can use save on document method

    let product = new Product({ name, description, price });
    product = await product.save();
    res.status(201).json({
      status: "Success",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed to create product",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      res.status(204).json({
        status: "fail",
        message: "Server worked fine but no data in database to display",
      });
    }
    res.status(200).json({
      status: "Success",
      products,
    });
  } catch (error) {
    console.log(error);
  }
};
