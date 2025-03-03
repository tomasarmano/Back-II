import CartModel from "../models/cart.js";

const getProductsCart = async (req, res) => {
  const productsCart = await CartModel.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};

export default getProductsCart;