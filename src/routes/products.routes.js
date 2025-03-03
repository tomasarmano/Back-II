import { Router } from "express";
import controllers from '../controllers/index.js'

export const productsRouter = Router();

productsRouter.get("/products", controllers.getProducts);

productsRouter.post("/products", controllers.addProductCart);  

productsRouter.put("/products/:productId", controllers.putProduct);  
productsRouter.delete("/products/:productId", controllers.deleteProduct);  

export default productsRouter;
