import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Category name is required"],
    unique: true, // Ensures no duplicate category names
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
