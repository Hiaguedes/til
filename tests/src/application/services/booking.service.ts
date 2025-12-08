import { Booking } from "../../domain/entities/booking";
import type { BookingRepository } from "../../domain/repositories/bookign.repository";
import { DateRange } from "../../domain/ValueObject/dateRange";
import type { CreateBookingDTO } from "../dtos/createBooking.dto";
import type { PropertyService } from "./property.service";
import type { UserService } from "./user.service";
import { v4 as uuidv4 } from 'uuid';

export class BookingService {
    private repository: {
        bookingRepository: BookingRepository,
    };

    private service: {
        propertyService: PropertyService,
        userService: UserService,
    }

    constructor(params: {
        repository: {
            bookingRepository: BookingRepository,
        }
        service: {
            propertyService: PropertyService,
            userService: UserService,
        }
    }) {
        this.validateParams(params);
        this.repository = params.repository;
        this.service = params.service;
    }

    validateParams(params: {
        repository: {
            bookingRepository: BookingRepository,
        }
        service: {
            propertyService: PropertyService,
            userService: UserService,
        }
    }): void {
        if (!params.repository.bookingRepository) {
            throw new Error("Booking Repository is required");
        }
        if (!params.service.propertyService) {
            throw new Error("Property Service is required");
        }
        if (!params.service.userService) {
            throw new Error("User Service is required");
        }
    }

    async createBooking(data: CreateBookingDTO): Promise<Booking> {
        const property = await this.service.propertyService.findPropertyById(data.propertyId);

        if (!property) {
            throw new Error("Property not found");
        }
        const guest = await this.service.userService.findUserById(data.guestId);

        if (!guest) {
            throw new Error("Guest not found");
        }

        const dateRange = new DateRange({ endDate: data.endDate, startDate: data.startDate }); // new = acoplamento, precisa de mock

        const booking: Booking = new Booking({
            id: uuidv4(),
            period: dateRange,
            property: property,
            user: guest,
            guests: data.guestCount,
        })

        await this.repository.bookingRepository.save(booking);

        return booking
    }

    async cancelBooking(bookingId: string): Promise<void> {

        const booking = await this.repository.bookingRepository.findById(bookingId);
        if (!booking) {
            throw new Error("Booking not found");
        }
        booking.cancel(new Date());
        await this.repository.bookingRepository.save(booking);
    }
}
