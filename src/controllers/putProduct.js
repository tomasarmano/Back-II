import Cart from "../models/cart.js";

const putProduct = async (req, res) => {
  const { productId } = req.params;
  const { query } = req.query;
  const { amount } = req.body; 

  try {
    if (!query || (query !== "add" && query !== "del")) {
      return res.status(400).json({ mensaje: "La query debe ser 'add' o 'del'" });
    }

    const productBuscado = await Cart.findById(productId);

    if (!productBuscado) {
      return res.status(404).json({ mensaje: "Producto no encontrado en el carrito" });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ mensaje: "La cantidad debe ser un número positivo" });
    }

    if (query === "add") {
      productBuscado.amount += 1;
    }

    if (query === "del") {
      if (productBuscado.amount > 1) {
        productBuscado.amount -= 1; 
      } else {
        return res.status(400).json({ mensaje: "La cantidad no puede ser menor a 1" });
      }
    }

    const updatedProduct = await productBuscado.save();

    res.json({
      mensaje: `El producto ${updatedProduct.name} fue actualizado en el carrito`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Hubo un error al actualizar el producto" });
  }
};

export default putProduct;
