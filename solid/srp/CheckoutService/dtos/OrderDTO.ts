export interface OrderDTO {
  items: { productId: string; quantity: number; price: number }[];
  totalPrice: number;
  tax: number;
  shippingCost: number;
}
