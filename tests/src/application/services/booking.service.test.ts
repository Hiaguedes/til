import { describe, it, expect, beforeEach, type Mocked, vi } from "vitest";
import type { CreateBookingDTO } from "../dtos/createBooking.dto";
import { MockBookingRepository } from "../../infra/repositories/booking.repository.mock";
import { BookingService } from "./booking.service";
import { UserService } from "./user.service";
import { PropertyService } from "./property.service";
import type { IPropertyRepository } from "../../domain/repositories/property.repository";
import { Booking } from "../../domain/entities/booking";
import { Property } from "../../domain/entities/property";

vi.mock("./property.service");
vi.mock("./user.service");

describe('Booking Service', () => {

    let bookingService: BookingService;
    let mockBookingRepository: MockBookingRepository;
    let mockPropertyService: Mocked<PropertyService>;
    let mockUserService: Mocked<UserService>;

    beforeEach(() => {
        const mockPropertyRepository = {
            findById: vi.fn().mockResolvedValue({ id: 'property-456', address: '123 Main St', maxGuests: 4, name: 'Cozy Apartment', description: 'A nice place to stay', pricePerNight: 100 }),
            save: vi.fn(),

        } as IPropertyRepository;
        const mockUserRepository = {} as any;
        mockBookingRepository = new MockBookingRepository();

        mockPropertyService = new PropertyService({
            repository: mockPropertyRepository
        }) as Mocked<PropertyService>;

        mockUserService = new UserService({
            repository: mockUserRepository
        }) as Mocked<UserService>

        bookingService = new BookingService({
            repository: {
                bookingRepository: mockBookingRepository,
            },
            service: {
                propertyService: mockPropertyService,
                userService: mockUserService,
            }
        })
    })

    it('should create a booking correctly', async () => {
        const mockProperty = new Property({
            id: 'property-456',
            address: '123 Main St',
            maxGuests: 4,
            name: 'Cozy Apartment',
            description: 'A nice place to stay',
            pricePerNight: 100
        });

        const mockUser = {
            id: 'user-123',
            name: 'John Doe',
        } as any;

        mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
        mockUserService.findUserById = vi.fn().mockResolvedValue(mockUser);

        const bookingDTO: CreateBookingDTO = {
            userId: 'user-123',
            propertyId: 'property-456',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-07-10'),
            guestCount: 1,
            guestId: 'guest-789'
        };

        const result = await bookingService.createBooking(bookingDTO);

        expect(result).toBeInstanceOf(Booking);
        expect(result.Period.startDateValue).toEqual(bookingDTO.startDate);
        expect(result.Period.endDateValue).toEqual(bookingDTO.endDate);
        expect(result.getGuestCount).toBe(bookingDTO.guestCount);
        expect(result.Status).toBe('CONFIRMED');
        expect(result.TotalPrice).toBe(810); // 9 nights * 100 per night with 10% discount

        const savedBooking = await mockBookingRepository.findById(result.Id);
        expect(savedBooking).not.toBeNull();
        expect(savedBooking).toEqual(result);
    });

    it('should throw error when property is not found', async () => {
        mockPropertyService.findPropertyById.mockResolvedValue(null);
        const bookingDTO: CreateBookingDTO = {
            userId: 'user-123',
            propertyId: 'non-existent-property',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-07-10'),
            guestCount: 1,
            guestId: 'guest-789'
        };
        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow("Property not found");
    });

    it('should throw error when guest is not found', async () => {
        const mockProperty = {
            getId: vi.fn().mockReturnValue('1'),
        } as any;

        mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(null);
        const bookingDTO: CreateBookingDTO = {
            userId: 'user-123',
            propertyId: 'property-456',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-07-10'),
            guestCount: 1,
            guestId: 'non-existent-guest'
        };
        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow("Guest not found");
    });

    it('should throw error when try to create booking for a period already booked', async () => {
        const mockProperty = {
            addBooking: vi.fn(),
            validateGuestCount: vi.fn().mockReturnValue(true),
            getId: vi.fn().mockReturnValue('1'),
            calculateTotalPrice: vi.fn().mockReturnValue(100),
            isAvailable: vi.fn().mockReturnValue(true)
        } as any;

        const mockUser = {
            getId: vi.fn().mockReturnValue('1')
        } as any;

        mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(mockUser);


        const bookingDTO: CreateBookingDTO = {
            userId: '1',
            propertyId: '1',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-07-10'),
            guestCount: 1,
            guestId: 'non-existent-guest'
        };

        const result = await bookingService.createBooking(bookingDTO);

        mockProperty.isAvailable.mockReturnValue(false);

        await expect(bookingService.createBooking(bookingDTO)).rejects.toThrow("Property is not available for the selected period");

    })

    it('should cancel an already booked reservation', async () => {
        const mockProperty = {
            addBooking: vi.fn(),
            validateGuestCount: vi.fn().mockReturnValue(true),
            getId: vi.fn().mockReturnValue('1'),
            calculateTotalPrice: vi.fn().mockReturnValue(100),
            isAvailable: vi.fn().mockReturnValue(true)
        } as any;

        const mockUser = {
            getId: vi.fn().mockReturnValue('1')
        } as any;

        mockPropertyService.findPropertyById.mockResolvedValue(mockProperty);
        mockUserService.findUserById.mockResolvedValue(mockUser);


        const bookingDTO: CreateBookingDTO = {
            userId: '1',
            propertyId: '1',
            startDate: new Date('2024-07-01'),
            endDate: new Date('2024-07-10'),
            guestCount: 1,
            guestId: 'non-existent-guest'
        };

        const result = await bookingService.createBooking(bookingDTO);
        const spyBookingSave = vi.spyOn(mockBookingRepository, 'save');


        await bookingService.cancelBooking(result.Id)

        const cancelledBooking = await mockBookingRepository.findById(result.Id);

        expect(cancelledBooking?.Status).toBe("CANCELED");

        expect(spyBookingSave).toHaveBeenCalledWith(cancelledBooking!);

    })

    it('should throw error when trying to cancel a non-existent booking', async () => {
        await expect(bookingService.cancelBooking('non-existent-booking')).rejects.toThrow("Booking not found");
    });
});