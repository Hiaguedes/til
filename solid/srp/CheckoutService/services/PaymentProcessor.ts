export interface PaymentResult {
  success: "success" | "failed";
  errorCode?: string;
}

export class PaymentProcessor {
  async processPayment(paymentDTO: {
    userId: string;
    amount: number;
    paymentInfo: { cardNumber: string; cvv: string };
  }): Promise<PaymentResult> {
    if (paymentDTO.paymentInfo.cardNumber === "0000") {
      return { success: "failed", errorCode: "invalid_card" };
    }
    return { success: "success" };
  }
}
