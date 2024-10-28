import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IOrderItem {
  productTitle: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
}

interface IOrder extends Document {
  userId: ObjectId | string;
  address: string;
  orderItems: IOrderItem[];
  total: number;
}

const orderItemSchema: Schema = new Schema({
  productTitle: { type: String, required: true },
  productImage: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  address: { type: String, required: true },
  orderItems: [orderItemSchema],
  total: { type: Number, required: true },
});

export const orderModel = mongoose.model<IOrder>("orders", orderSchema);
