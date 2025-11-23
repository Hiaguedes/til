import type { RefundRule } from "./cancelation.interface";

export class FullRefund implements RefundRule {
    calculateRefund(totalPrice: number): number {
        return 0; // Full refund
    }
}