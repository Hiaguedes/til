class User {
    constructor(public name: string, private financialInfo: string = 'Dados financeiros do usuario') { }

    hasAccess(): boolean {
        return true; // Simulando que o usuario tem acesso
    }

    getFinancialInfo(): string {
        if (this.hasAccess()) {
            return this.financialInfo;
        } else {
            throw new Error("Acesso negado aos dados financeiros");
        }
    }
}

class GuestUser extends User {
    constructor(name: string, financialInfo: string) {
        super(name, financialInfo);
    }
    hasAccess(): boolean {
        return false; // Convidados nao tem acesso
    }

    getFinancialInfo(): string {
        if (this.hasAccess()) {
            return super.getFinancialInfo();
        } else {
            throw new Error("Acesso negado aos dados financeiros - Usuario nao e admin"); // me retorna erro assim como no admin nao quebrando o contrato
        }
    }
}

function makePayment(user: User, amount: number): void {
    try {
        const financialInfo = user.getFinancialInfo();
        console.log(`Processando pagamento de ${amount} para ${user.name} usando ${financialInfo}`);
    } catch (error: any) {
        console.error(error?.message);
    }
}

const admin = new User("Admin User");
makePayment(admin, 100); // Processando pagamento de 100 para Admin User usando Dados financeiros do usuario

const guest = new GuestUser("Guest User", "Dados financeiros do convidado");
makePayment(guest, 50); // Acesso negado aos dados financeiros - Usuario nao e admin