import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  inCart: { type: Boolean, default: false },
  price: { type: Number, required: true },
});

export const ProductModel = model("Product", ProductSchema);
