type BookingDetails = {
    startDate: Date;
    endDate: Date;
    dailyRate: number;
    email: string;
};

class BookingValidator {
    validateDates(startDate: Date, endDate: Date): void {
        if (startDate >= endDate) {
            throw new Error("Invalid booking dates");
        }
    }
}

class BookingPriceCalculator {
    calculateTotalPrice(startDate: Date, endDate: Date, dailyRate: number): number {
        const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        return durationInDays * dailyRate;
    }
}

class EmailService {
    sendConfirmation(email: string, totalPrice: number): void {
        console.log(`Send email confirmation to ${email} with total price: $${totalPrice}`);
    }
}

class BookingService {
    private validator: BookingValidator;
    private priceCalculator: BookingPriceCalculator;
    private emailService: EmailService; // aqui tem um acoplamento forte de classes, o ideal seria inverter a dependencia, mas isso e um assunto para o DIP (Dependency Inversion Principle)

    constructor() {
        this.validator = new BookingValidator();
        this.priceCalculator = new BookingPriceCalculator();
        this.emailService = new EmailService();
    }

    processBooking(bookingDetails: BookingDetails): void {
        this.validator.validateDates(bookingDetails.startDate, bookingDetails.endDate);

        const totalPrice = this.priceCalculator.calculateTotalPrice(
            bookingDetails.startDate,
            bookingDetails.endDate,
            bookingDetails.dailyRate
        );

        this.emailService.sendConfirmation(bookingDetails.email, totalPrice);
    }
}

// Example usage
const bookingService = new BookingService();
const bookingDetails: BookingDetails = {
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-10-05"),
    dailyRate: 100,
    email: "teste_srp@email.com"
};

try {
    bookingService.processBooking(bookingDetails);
} catch (error) {
    console.error(error instanceof Error ? error.message : "An unexpected error occurred");
}   
