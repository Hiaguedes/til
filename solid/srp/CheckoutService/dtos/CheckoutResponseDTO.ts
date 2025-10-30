export interface CheckoutResponseDTO {
  orderId: string;
  totalPrice: number;
  shippingCost: number;
  status: "success" | "failed";
  error: string | null;
}
