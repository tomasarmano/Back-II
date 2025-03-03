import { userModel } from "../models/user.model.js"; 
import { ProductModel } from "../models/product.js"; 

const addProductCart = async (req, res) => {
  const { name, img, price } = req.body;
  const userId = req.user.id;

  try {

    const product = await ProductModel.findOne({ name });

    if (!product) {
      return res.status(400).json({
        mensaje: "Este producto no se encuentra en nuestra base de datos",
      });
    }

    const noEstaVacio = name !== "" && img !== "" && price !== "";

    if (noEstaVacio) {
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(400).json({
          mensaje: "Usuario no encontrado",
        });
      }

      const productInCart = user.cart.find(item => item.productId.toString() === product._id.toString());

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        user.cart.push({
          productId: product._id,
          quantity: 1,
          addedAt: new Date(),
        });
      }

      await user.save();

      res.json({
        mensaje: `El producto ha sido agregado al carrito`,
        product: { name, img, price },
      });

      await ProductModel.findByIdAndUpdate(
        product._id,
        { inCart: true }, 
        { new: true }
      );
    } else {
      res.status(400).json({
        mensaje: "Todos los campos deben ser válidos",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Hubo un error al agregar el producto al carrito",
    });
  }
};

export default addProductCart;
