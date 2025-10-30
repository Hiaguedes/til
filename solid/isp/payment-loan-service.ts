interface PaymentService {
    processCreditCardPayment(amount: number): void;
    validateCreditCard(): void;
    processLoan(amount: number): void;
}

class CreditCardService implements PaymentService {
    processCreditCardPayment(amount: number) {
        // Implementação de pagamento com cartão de crédito
    }

    validateCreditCard() {
        // Validação de cartão de crédito
    }

    processLoan(amount: number) {
        // Não deveria existir
        throw new Error("Método não suportado");
    }
}

class LoanService implements PaymentService {
    processCreditCardPayment(amount: number) {
        // Não deveria existir
        throw new Error("Método não suportado");
    }

    validateCreditCard() {
        // Não deveria existir
        throw new Error("Método não suportado");
    }

    processLoan(amount: number) {
        // Processamento de pagamento de empréstimo
    }
}

/*
Neste exemplo, criamos uma interface PaymentService com três métodos: processCreditCardPayment(),
validateCreditCard() e processLoan(). Porém, forçar todas as classes a implementar todos os métodos viola o
Princípio da Segregação de Interface (ISP).
As classes CreditCardService e LoanService são obrigadas a implementar métodos que não fazem sentido em
seu contexto, o que demonstra uma violação do ISP. Na prática, seria melhor criar interfaces menores e mais
específicas.
*/