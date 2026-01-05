import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
  },
  { timestamps: true }
);

const Product =
  models.Product || mongoose.model("Product", ProductSchema);

export default Product;
