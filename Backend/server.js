import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cors from "cors";
const port = process.env.PORT || 5000;

//conect database
connectDB();
const app = express();
//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//midleware
app.use(cors());
app.get("/", (req, res) => {
  res.send("Api is Running......");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
