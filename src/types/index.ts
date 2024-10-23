export interface FrozenProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  slug: string;
  category: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  email: string;
  status: string;
  orderItems: OrderItem[];
  totalAmount: number;
  createdAt: string;
}
