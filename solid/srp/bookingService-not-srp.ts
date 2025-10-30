
type BookingDetails = {
    startDate: Date;
    endDate: Date;
    dailyRate: number;
    email: string;
};

class BookingService {
    processBooking(bookingDetails: BookingDetails): void {
        // Validate booking details
        if (bookingDetails.startDate >= bookingDetails.endDate) {
            throw new Error("Invalid booking dates");
        }

        // calculo preco total
        const durationInDays = Math.ceil((bookingDetails.endDate.getTime() - bookingDetails.startDate.getTime()) / (1000 * 60 * 60 * 24));
        const totalPrice = durationInDays * bookingDetails.dailyRate;



        console.log(`Total price for booking: $${totalPrice}`);
        console.log(`Send email confirmation to ${bookingDetails.email}`);
    }
}

// Example usage
const bookingService = new BookingService();
const bookingDetails: BookingDetails = {
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-10-05"),
    dailyRate: 100,
    email: "test@test.com"
};

try {
    bookingService.processBooking(bookingDetails);
} catch (error) {
    console.error(error instanceof Error ? error.message : "An unexpected error occurred");
}

/*
 E normal que tenhamos classes orquestradoras no SRP (Single Responsibility Principle),
  pois objetos tem que se comunicar entre si para realizar tarefas mais complexas.
No entanto, eu tenho que me atentar a mudancas de negocio que podem afetar
a orquestracao de objetos.
Por exemplo, se eu precisar mudar a forma como o preco total e calculado, eu terei uma motivo pra mudanca nessa classe
e isso pode violar o SRP.
*/
