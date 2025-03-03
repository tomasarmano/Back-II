import { userModel } from "../models/user.model.js"; 
import { ProductModel } from "../models/product.js"; 

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id; 

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        mensaje: "Usuario no encontrado",
      });
    }

    const productInCart = user.cart.find(item => item.productId.toString() === productId);

    if (!productInCart) {
      return res.status(400).json({
        mensaje: "El producto no está en tu carrito",
      });
    }

    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    await user.save();

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(400).json({
        mensaje: "Producto no encontrado",
      });
    }

    await ProductModel.findByIdAndUpdate(
      productId,
      { inCart: false }, 
      { new: true }
    );

    res.json({
      mensaje: `El producto ${product.name} fue eliminado del carrito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Hubo un error al eliminar el producto del carrito",
    });
  }
};

export default deleteProduct;
