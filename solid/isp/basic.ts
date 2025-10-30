// ISP - Interface Segregation Principle
// Clients should not be forced to depend on interfaces they do not use.


interface Payment {
    processPayment(amount: number): void;
}

interface Stock {
    isAvailable(itemId: string): boolean;
    getQuantity(itemId: string): number;
}

interface Shipping {
    calculateShippingCost(destination: string): number;
    getAddressDetails(addressId: string): string;
    scheduleDelivery(date: Date): void;
}

interface CheckoutService extends Payment, Stock, Shipping {
    processPayment(amount: number): void;
    isAvailable(itemId: string): boolean;
    getQuantity(itemId: string): number;
    calculateShippingCost(destination: string): number;
    getAddressDetails(addressId: string): string;
    scheduleDelivery(date: Date): void;

    checkTaxCompliance(taxId: string): boolean; // metodo extra que nao faz parte da interface Payment pro Checkout
    isAvailableInWarehouse(itemId: string, warehouseId: string): boolean; // metodo extra que nao faz parte da interface Stock pro Checkout
}

// interfaces segregadas para diferentes responsabilidades, payment e mais complexo que isso mas nao importa se usa mercado pago, paypal, pix, etc

// segregacao da segregacao

// Limitacao realizada pelo checkout - o servico de checkout definiu uma interface pensando apenas em suas propias necessidades
// imediatas, sem considerar as complexidades mais amplas do servico de pagamento

// O que payment deve implementar? Para que uma unica interface definida pela perspectiva do checkout e o suficiente para representar todos os requisitos
// e responsabilidades de um servico de pagamento complexo?

// pra isso voce cria uma interface geral de pagamento que precisa implementar o processPayment e ela estara fortemente 
// acoplada ao servico de checkout, mas o servico de pagamento pode ter sua propria interface com mais detalhes

// Assim, o servico de checkout depende apenas do que realmente precisa, sem ser forcado a depender de metodos que nao utiliza

class SimplePaymentService implements Payment {
    processPayment(amount: number): void {
        console.log(`Processando pagamento de ${amount}`);
    }

    checkTaxCompliance(taxId: string): boolean { // metodo extra que nao faz parte da interface Payment pro Checkout
        console.log(`Verificando conformidade fiscal para ${taxId}`);
        return true;
    }

}