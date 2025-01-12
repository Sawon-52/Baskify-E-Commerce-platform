import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import { createCategory, getCategory } from "../controllers/categoryController.js";

router.route("/").post(protect, admin, createCategory).get(getCategory);

export default router;
