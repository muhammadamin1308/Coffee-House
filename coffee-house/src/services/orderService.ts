import { API_ENDPOINTS } from "../config/api";
import type { CartItem } from "../types";

interface OrderItem {
  productId: number;
  size: string;
  additives: string[];
  quantity: number;
}

interface OrderRequest {
  items: OrderItem[];
  totalPrice: number;
}

interface OrderResponse {
  message: string;
  orderId?: number;
}

export class OrderService {
  static async confirmOrder(
    cartItems: CartItem[],
    totalPrice: number
  ): Promise<OrderResponse> {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      throw new Error("User must be logged in to place an order");
    }

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.productId,
      size: item.size,
      additives: item.additives,
      quantity: item.quantity,
    }));

    const orderRequest: OrderRequest = {
      items: orderItems,
      totalPrice,
    };

    const response = await fetch(API_ENDPOINTS.CONFIRM_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(orderRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to place order");
    }

    return await response.json();
  }
}
