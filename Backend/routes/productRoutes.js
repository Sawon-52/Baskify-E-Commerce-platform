import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }

    res.status(404).json({ message: "Products not Found" });
  }),
);

export default router;
