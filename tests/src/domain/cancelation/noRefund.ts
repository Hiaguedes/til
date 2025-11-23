import type { RefundRule } from "./cancelation.interface";

export class NoRefund implements RefundRule {
    calculateRefund(totalPrice: number): number {
        return totalPrice; // no refund
    }
}