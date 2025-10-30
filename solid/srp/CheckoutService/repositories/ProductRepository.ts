import { Product } from "../entities/Product";

export class ProductRepository {
  private products: Product[] = [
    new Product("1", "Produto A", 100),
    new Product("2", "Produto B", 50),
    new Product("3", "Produto C", 200),
  ];

  async findById(productId: string): Promise<Product> {
    const product = this.products.find((p) => p.id === productId);
    if (!product) {
      throw new Error(`Produto com ID ${productId} não encontrado`);
    }
    return product;
  }
}
