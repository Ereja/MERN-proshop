import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//description: fetches all prdocuts
//route: GET /api/products
//access: Public, anyone can access
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//description: fetches specific product
//route: GET /api/product/:id
//access: Public, anyone can access
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductById };
