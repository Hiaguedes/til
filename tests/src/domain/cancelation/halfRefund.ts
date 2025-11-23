import type { RefundRule } from "./cancelation.interface";

export class HalfRefund implements RefundRule {
    calculateRefund(totalPrice: number): number {
        return totalPrice * 0.5; // Full refund
    }
}