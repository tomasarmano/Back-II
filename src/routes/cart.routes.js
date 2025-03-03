import { Router } from "express";
import controllers from '../controllers/index.js'

export const cartRouter = Router();

cartRouter.post("/products-cart", controllers.addProductCart);

cartRouter.get("/products-cart", controllers.getProductsCart);

cartRouter.put("/products-cart/:productId", controllers.putProduct);

cartRouter.delete("/products-cart/:productId", controllers.deleteProduct);

export default cartRouter;
