interface CreditCardPaymentProcessor {
    processCreditCardPayment(amount: number): void;
    validateCreditCard(): void;
}

interface LoanProcessor {
    processLoan(amount: number): void;
}

class CreditCardService
    implements CreditCardPaymentProcessor {
    processCreditCardPayment(amount: number) {
        // Implementação de pagamento
    }

    validateCreditCard() {
        // Validação de cartão
    }
}

class LoanService
    implements LoanProcessor {
    processLoan(amount: number) {
        // Processamento de empréstimo
    }
}

/*
Nesta solução, criamos interfaces menores e específicas. Cada serviço implementa apenas as interfaces
relevantes para sua funcionalidade, respeitando o Princípio da Segregação de Interface (ISP).
Agora, as classes não são forçadas a implementar métodos irrelevantes, tornando o design mais limpo e flexível.
*/