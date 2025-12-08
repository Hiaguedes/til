import { Booking } from "../../domain/entities/booking";
import { Property } from "../../domain/entities/property";
import { User } from "../../domain/entities/user";
import type { BookingRepository } from "../../domain/repositories/bookign.repository";
import { DateRange } from "../../domain/ValueObject/dateRange";

export class MockBookingRepository implements BookingRepository {
    private bookings: Booking[] = [
        new Booking({
            id: 'booking-001',
            user: new User({
                id: 'user-123',
                name: 'John Doe',
            }),
            property: new Property({
                id: 'property-456',
                address: '123 Main St',
                maxGuests: 4,
                name: 'Cozy Apartment',
                description: 'A nice place to stay',
                pricePerNight: 100,
            }),
            period: new DateRange({
                startDate: new Date('2024-07-01'),
                endDate: new Date('2024-07-10')
            }),
            guests: 2,
            status: 'CONFIRMED',

        })
    ];
    async save(booking: Booking): Promise<void> {
        this.bookings.push(booking);
    }

    async findById(id: string): Promise<Booking | null> {
        const booking = this.bookings.find((b) => b.Id === id);
        return booking || null;
    }
}