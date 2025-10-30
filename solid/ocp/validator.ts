// class Validator {
//     validate(field: string, value: string): boolean {
//         if (field === "email") {
//             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             return emailRegex.test(value);
//         } else if (field === "password") {
//             return value.length >= 6; // senha deve ter pelo menos 6 caracteres
//         } else if (field === 'phone') {
//             const phoneRegex = /^\+?[1-9]\d{1,14}$/;
//             return phoneRegex.test(value);
//         }
//         throw new Error(`Validation for field ${field} not supported`);
//     }
// }   

interface ValidationStrategy {
    validate(value: string): boolean;
}

class EmailValidation implements ValidationStrategy {
    validate(value: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
}
class PasswordValidation implements ValidationStrategy {
    validate(value: string): boolean {
        return value.length >= 6; // senha deve ter pelo menos 6 caracteres
    }
}
class PhoneValidation implements ValidationStrategy {
    validate(value: string): boolean {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        return phoneRegex.test(value);
    }
}
class Validator {
    // agora a classe esta aberta para extensao (posso adicionar novos tipos de validacoes implementando a interface ValidationStrategy)
    // mas fechada para modificacao (nao preciso modificar o codigo dessa classe para adicionar novos tipos de validacoes)
    validate(strategy: ValidationStrategy, value: string): boolean {
        return strategy.validate(value);
    }
}

// Example usage
const validator = new Validator();
console.log("Email valid:", validator.validate(new EmailValidation(), "test@test.com"));
console.log("Password valid:", validator.validate(new PasswordValidation(), "123456"));
console.log("Phone valid:", validator.validate(new PhoneValidation(), "+1234567890"));
