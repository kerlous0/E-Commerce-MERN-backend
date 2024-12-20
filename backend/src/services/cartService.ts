import { cartModel } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import { productModel } from "../models/productModel";

interface CreateCartForUser {
  userId: string;
}

const createCartForUser = async ({ userId }: CreateCartForUser) => {
  const cart = await cartModel.create({ userId, totalAmount: 0 });
  await cart.save();
  return cart;
};

interface GetActiveCartForUser {
  userId: string;
}

export const getActiveCartForUser = async ({
  userId,
}: GetActiveCartForUser) => {
  let cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await createCartForUser({ userId });
  }

  return cart;
};

interface AddProductToCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddProductToCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );
  if (existsInCart) {
    return { data: "item already exists in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "not enough stock", statusCode: 400 };
  }

  cart.items.push({ product: productId, unitPrice: product.price, quantity });
  cart.totalAmount += product.price * quantity;
  const updatedCard = await cart.save();

  return { data: updatedCard, statusCode: 200 };
};

interface ClearCart {
  userId: string;
}

export const clearCart = async ({ userId }: ClearCart) => {
  const cart = await getActiveCartForUser({ userId });
  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  return { data: cart, statusCode: 200 };
};

interface UpdateItemInCart {
  userId: string;
  productId: any;
  quantity: number;
}

export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCart) => {
  const cart = await getActiveCartForUser({ userId });
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "item not exists in cart", statusCode: 400 };
  }

  const product = await productModel.findById(productId);
  if (!product) {
    return { data: "product not found", statusCode: 404 };
  }

  if (product.stock < quantity) {
    return { data: "not enough stock", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );
  let total = otherCartItems.reduce((sum, product) => {
    return sum + product.quantity * product.unitPrice;
  }, 0);

  existsInCart.quantity = quantity; //imp
  total += existsInCart.quantity * existsInCart.unitPrice;
  cart.totalAmount = total;

  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 200 };
};

interface DeleteItemInCart {
  userId: string;
  productId: any;
}

export const deleteItemInCart = async ({
  userId,
  productId,
}: DeleteItemInCart) => {
  const cart = await getActiveCartForUser({ userId });

  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (!existsInCart) {
    return { data: "item not exists in cart", statusCode: 400 };
  }

  const otherCartItems = cart.items.filter(
    (p) => p.product.toString() !== productId
  );

  cart.items = otherCartItems;
  cart.totalAmount -= existsInCart.quantity * existsInCart.unitPrice;
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

interface Checkout {
  userId: string;
  address: string;
}

export const checkout = async ({ userId, address }: Checkout) => {
  if (!address) {
    return { data: "Address is required", statusCode: 400 };
  }

  const cart = await getActiveCartForUser({ userId });
  if (cart.items.length === 0) {
    return { data: "cart is empty", statusCode: 400 };
  }

  const orderItems: IOrderItem[] = [];
  await Promise.all(
    // or use for loop (of)
    cart.items.map(async (p) => {
      let product = await productModel.findOne({ _id: p.product });
      if (!product) {
        return { data: "Invalid product id", statusCode: 400 };
      }

      const orderItem: IOrderItem = {
        productTitle: product.title,
        productImage: product.image,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
      };

      orderItems.push(orderItem);
    })
  );

  const order = await orderModel.create({
    userId,
    orderItems,
    total: cart.totalAmount,
    address,
  });

  await order.save();

  cart.status = "completed";
  await cart.save();
  return { data: order, statusCode: 200 };
};
