import { model, Schema } from "mongoose";

const CartSchema = new Schema({
  name: { type: String, required: true, unique: true },
  img: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

const CartModel = model("Cart", CartSchema);
export default CartModel;
