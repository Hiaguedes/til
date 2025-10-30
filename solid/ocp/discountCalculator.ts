// class DiscountCalculator {
//     calculateDiscount(userType: string): number {
//         if (userType === "regular") {
//             return 0.1; // 10% discount for regular users
//         } else if (userType === "premium") {
//             return 0.2; // 20% discount for premium users
//         } else {
//             return 0; // No discount for others
//         }
//     }
// }

interface DiscountStrategy {
    calculate(): number;
}

class RegularUserDiscount implements DiscountStrategy {
    calculate(): number {
        return 0.1; // 10% discount for regular users
    }
}
class PremiumUserDiscount implements DiscountStrategy {
    calculate(): number {
        return 0.2; // 20% discount for premium users
    }
}
class NoDiscount implements DiscountStrategy {
    calculate(): number {
        return 0; // No discount for others
    }
}
class DiscountCalculator {
    // agora a classe esta aberta para extensao (posso adicionar novos tipos de descontos implementando a interface DiscountStrategy)
    // mas fechada para modificacao (nao preciso modificar o codigo dessa classe para adicionar novos tipos de descontos)
    calculateDiscount(strategy: DiscountStrategy): number {
        return strategy.calculate();
    }
}

const discountCalculator = new DiscountCalculator();
console.log("Regular User Discount (%):", discountCalculator.calculateDiscount(new RegularUserDiscount()));
console.log("Premium User Discount (%):", discountCalculator.calculateDiscount(new PremiumUserDiscount()));
console.log("No User Discount (%):", discountCalculator.calculateDiscount(new NoDiscount()));