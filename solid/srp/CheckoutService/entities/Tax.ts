export class Tax {
  calculateTax(subtotal: number): number {
    const taxRate = 0.1; // Taxa fixa de 10%
    return subtotal * taxRate;
  }
}
