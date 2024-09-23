import { productModel } from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const sendInitailProducts = async () => {
  const products = [
    {
      title: "Dell Laptop",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9aodusVTpoxoHdvs1VKvLeaIZzHb9p1Ni9w&s",
      price: 15000,
      stock: 100,
    },
  ];

  const existProduct = await getAllProducts();
  if (existProduct.length === 0) {
    await productModel.insertMany(products);
  }
};
