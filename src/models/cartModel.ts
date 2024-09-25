import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";

interface ICartItem extends Document {
  product: IProduct;
  unitPrice: number;
  quantity: number;
}

interface ICart extends Document {
  userId: ObjectId | string;
  items: ICartItem[];
  totalAmount: number;
  status: "active" | "completed";
}

const cartItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  items: [cartItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["active", "completed"], default: "active" },
});

export const cartModel = mongoose.model<ICart>("carts", cartSchema);
