import type { RefundRule } from "./cancelation.interface";
import { FullRefund } from "./fullRefund";
import { HalfRefund } from "./halfRefund";
import { NoRefund } from "./noRefund";

export class RefundRuleFactory {
    static getRefundRule(daysBeforeCheckIn: number): RefundRule {
        if (daysBeforeCheckIn >= 7) {
            return new FullRefund();
        } else if (daysBeforeCheckIn > 1 && daysBeforeCheckIn < 7) {
            return new HalfRefund();
        } else {
            return new NoRefund();
        }
    }
}