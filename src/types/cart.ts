export interface CartSKUProduct {
  id: number;
  name: string;
  basePrice: number;
  virtualPrice: number;
  brandId: number;
  images: string[];
}

export interface CartSKU {
  id: number;
  value: string;
  price: number;
  stock: number;
  image: string;
  productId: number;
  product: CartSKUProduct;
}

export interface CartItem {
  id: number;
  quantity: number;
  skuId: number;
  userId: number;
  sku: CartSKU;
  createdAt: string;
  updatedAt: string;
}

export interface CartShop {
  id: number;
  name: string;
  avatar: string | null;
}

export interface CartGroup {
  shop: CartShop;
  cartItems: CartItem[];
}

export interface GetCartResponse {
  data: CartGroup[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}
