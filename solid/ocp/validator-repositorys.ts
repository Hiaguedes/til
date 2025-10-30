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
    private strategies: Record<string, ValidationStrategy> = {};

    addStrategy(field: string, strategy: ValidationStrategy): void {
        // This method can be used to add strategies dynamically if needed
        this.strategies[field] = strategy;
    }

    validate(field: string, value: string): boolean {
        const strategy = this.strategies[field];
        if (!strategy) {
            throw new Error(`Validation for field ${field} not supported`);
        }
        return strategy.validate(value);
    }
}

// Example usage
const validator = new Validator();
validator.addStrategy("email", new EmailValidation());
validator.addStrategy("password", new PasswordValidation());
validator.addStrategy("phone", new PhoneValidation());

console.log("Email valid:", validator.validate('email', "test@test.com"));
console.log("Password valid:", validator.validate('password', "123456"));
console.log("Phone valid:", validator.validate('phone', "+1234567890"));
