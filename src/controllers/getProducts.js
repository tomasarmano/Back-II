import { ProductModel } from "../models/product.js";

const getProducts = async (req, res) => {
  const products = await ProductModel.find();

  if (products) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos" });
  }
};

export default getProducts;