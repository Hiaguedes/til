class PaymentProcessor {
    processPayment(amount: number): boolean {
        // Simulate payment processing logic  
        if (amount <= 0) {
            throw new Error("Invalid payment amount"); // restricao
        }

        console.log(`Processing payment of ${amount.toFixed(2)}`);

        return true; // Assume payment is always successful for this example
    }
}

class CreditCardProcessor extends PaymentProcessor {
    processPayment(amount: number): boolean {

        if (amount > 10000) {
            throw new Error("Amount exceeds credit card limit"); // adicao de restricao
            // quebrando o contrato de liskov
        }

        console.log("Processing credit card payment...");
        return super.processPayment(amount);
    }
}

function makePayment(processor: PaymentProcessor, amount: number): void {
    try {
        const success = processor.processPayment(amount);
        if (success) {
            console.log("Payment processed successfully.");
        } else {
            console.log("Payment failed.");
        }
    } catch (error: any) {
        console.error(error?.message);
    }
}

const generalProcessor = new PaymentProcessor();
makePayment(generalProcessor, 10500); // Payment processed successfully.

const creditCardProcessor = new CreditCardProcessor();
makePayment(creditCardProcessor, 10500); // Amount exceeds credit card limit - quebrando o contrato de liskov, pq o usuario espera que o processador de pagamento processe o pagamento, mas ele nao processa pq tem uma restricao a mais.
// uma solucao seria implementar essa restriccao sem quebrar o principio de liskov, por exemplo, criando uma nova classe que herda de PaymentProcessor e implementa a restricao de limite de cartao de credito.