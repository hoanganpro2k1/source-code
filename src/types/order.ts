export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PENDING_PICKUP"
  | "PENDING_DELIVERY"
  | "DELIVERED"
  | "RETURNED"
  | "CANCELLED";

export interface OrderReceiver {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  receiver: OrderReceiver;
  shopId: number | null;
  paymentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderItem {
  shopId: number;
  receiver: OrderReceiver;
  cartItemIds: number[];
}

export interface CreateOrderResponse {
  orders: Order[];
  paymentId: number;
}

export interface OrderItemSnapshot {
  id: number;
  productId: number | null;
  productName: string;
  skuPrice: number;
  image: string;
  skuValue: string;
  skuId: number | null;
  quantity: number;
}

export interface OrderDetail extends Order {
  items: OrderItemSnapshot[];
}
