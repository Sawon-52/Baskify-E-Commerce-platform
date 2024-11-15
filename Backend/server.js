import express from "express";
import products from "./Data/products.js";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
const port = process.env.PORT || 5000;

const app = express();

//midleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is Running......");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id == req.params.id);
  res.json(product);
});

app.listen(port, () => console.log(`Server runing on port ${port}`));
