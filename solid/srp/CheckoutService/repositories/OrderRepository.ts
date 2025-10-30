import { Order } from "../entities/Order";

export class OrderRepository {
  async save(order: Order): Promise<void> {
    console.log("Pedido salvo no banco:", order.toDTO());
  }
}
