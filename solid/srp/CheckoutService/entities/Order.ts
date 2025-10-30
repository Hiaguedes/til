import { OrderDTO } from "../dtos/OrderDTO";
import { Product } from "./Product";
import { Shipping } from "./Shipping";
import { Tax } from "./Tax";

export class Order {
  private subtotal: number;
  private tax: number;
  private shippingCost: number;
  private paymentStatus: string = "pending";
  private paymentError: string | null = null;

  constructor(
    private items: { product: Product; quantity: number }[],
    tax: Tax,
    shipping: Shipping
  ) {
    this.subtotal = this.calculateSubtotal();
    this.tax = tax.calculateTax(this.subtotal);
    this.shippingCost = shipping.calculateShipping(this.subtotal);
  }

  private calculateSubtotal(): number {
    return this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  getTotalPrice(): number {
    return this.subtotal + this.tax + this.shippingCost;
  }

  changePaymentStatus(status: string, error: string | null): void {
    this.paymentStatus = status;
    this.paymentError = error;
  }

  toDTO(): OrderDTO {
    return {
      items: this.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalPrice: this.getTotalPrice(),
      tax: this.tax,
      shippingCost: this.shippingCost,
    };
  }
}
