import { type CheckoutDTO } from "../dtos/CheckoutDTO";
import type { CheckoutResponseDTO } from "../dtos/CheckoutResponseDTO";
import { StockValidator } from "./StockService";
import { PaymentProcessor } from "./PaymentProcessor";
import { OrderRepository } from "../repositories/OrderRepository";
import { Order } from "../entities/Order";
import { PricingService } from "./PricingService";
import { Tax } from "../entities/Tax";
import { Shipping } from "../entities/Shipping";

export class CheckoutService {
  constructor(
    private paymentProcessor: PaymentProcessor,
    private orderRepository: OrderRepository,
    private stockValidator: StockValidator,
    private PricingService: PricingService,
    private tax: Tax, // Entidade!!!!!!
    private shipping: Shipping
  ) { }

  async processCheckout(
    checkoutDTO: CheckoutDTO
  ): Promise<CheckoutResponseDTO> {
    let paymentStatus: "success" | "failed" = "success";
    let paymentError: string | null = null;

    // 1. Verificar o estoque
    await this.stockValidator.validateStock(checkoutDTO.items);

    // 2. Buscar produtos e calcular subtotal
    const itemsWithProducts = await this.PricingService.getItemsWithProducts(
      checkoutDTO.items
    );

    const order = new Order(itemsWithProducts, this.tax, this.shipping);

    const paymentResult = await this.paymentProcessor.processPayment({
      userId: checkoutDTO.userId,
      amount: order.getTotalPrice(),
      paymentInfo: checkoutDTO.paymentInfo,
    });

    paymentStatus = paymentResult.success;
    if (!paymentResult.success) {
      paymentError = `Erro ao processar pagamento: ${paymentResult.errorCode}`;
    }

    order.changePaymentStatus(paymentStatus, paymentError);

    // 7. Registrar o pedido no repositório
    await this.orderRepository.save(order);

    const orderDTO = order.toDTO();
    // 8. Retornar a resposta diretamente
    return {
      orderId: "generated-id",
      totalPrice: orderDTO.totalPrice,
      shippingCost: orderDTO.shippingCost,
      status: paymentStatus,
      error: paymentError,
    };
  }
}
