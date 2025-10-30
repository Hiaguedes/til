export interface outOfStockItem {
  productId: string;
  requestedQuantity: number;
  availableQuantity: number;
}

export class StockValidator {
  constructor(private stockService: StockService) {}

  async validateStock(
    items: { productId: string; quantity: number }[]
  ): Promise<void> {
    const outOfStockItems = await this.stockService.checkStock(items);

    if (outOfStockItems.length > 0) {
      throw new Error(
        `Produtos fora de estoque: ${outOfStockItems.join(", ")}`
      );
    }
  }
}

export class StockService {
  private stock: { [productId: string]: number } = {
    "1": 10,
    "2": 5,
    "3": 0,
  };

  async checkStock(
    items: { productId: string; quantity: number }[]
  ): Promise<outOfStockItem[]> {
    const outOfStockItems: outOfStockItem[] = [];
    for (const item of items) {
      const availableQuantity = this.stock[item.productId] || 0;
      if (item.quantity > availableQuantity) {
        outOfStockItems.push({
          productId: item.productId,
          requestedQuantity: item.quantity,
          availableQuantity,
        });
      }
    }
    return outOfStockItems;
  }
}
