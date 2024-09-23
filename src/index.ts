import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/uesrRoute";
import { sendInitailProducts } from "./services/productServices";
import productRoute from "./routes/productRoute";

const app = express();
const port = 3001;

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

sendInitailProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
