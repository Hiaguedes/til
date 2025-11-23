import { describe, it, expect } from "vitest";
import { Property } from "./property";
import { DateRange } from "../ValueObject/dateRange";
import { User } from "./user";
import { Booking } from "./booking";

describe("Booking Entity", () => {
    it("should create new instance of Booking normally", () => {

        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        })

        const user = new User({
            id: "user-1",
            name: "John Doe",
        })

        const dateRange = new DateRange({
            startDate: new Date("2024-07-01"),
            endDate: new Date("2024-07-05"),
        })

        const booking = new Booking({
            id: "booking-1",
            user,
            property,
            period: dateRange,
            guests: 2,
        });

        expect(booking).toBeInstanceOf(Booking);
        expect(booking.Id).toBe("booking-1");
        expect(booking.User).toBe(user);
        expect(booking.Property).toBe(property);
        expect(booking.Period).toBe(dateRange);
        expect(booking.getGuestCount).toBe(2);
    });

    it.each([
        { props: { id: '', user: null, property: null, period: null, guests: 2 }, errorMessage: 'ID cannot be empty', incorrectParam: 'id' },
        { props: { id: 'booking-1', user: null, property: null, period: null, guests: 2 }, errorMessage: 'User cannot be empty', incorrectParam: 'user' },
        { props: { id: 'booking-1', user: new User({ id: 'user-1', name: 'John Doe' }), property: null, period: null, guests: 2 }, errorMessage: 'Property cannot be empty', incorrectParam: 'property' },
        { props: { id: 'booking-1', user: new User({ id: 'user-1', name: 'John Doe' }), property: new Property({ id: 'property-1', address: '123 Main St', description: 'A lovely property', maxGuests: 4, pricePerNight: 100, name: 'Cozy Cottage' }), period: null, guests: 2 }, errorMessage: 'Period cannot be empty', incorrectParam: 'period' },
        { props: { id: 'booking-1', user: new User({ id: 'user-1', name: 'John Doe' }), property: new Property({ id: 'property-1', address: '123 Main St', description: 'A lovely property', maxGuests: 4, pricePerNight: 100, name: 'Cozy Cottage' }), period: new DateRange({ startDate: new Date('2024-07-01'), endDate: new Date('2024-07-05') }), guests: 0 }, errorMessage: 'Guest count must be greater than zero', incorrectParam: 'guests' },
        { props: { id: 'booking-1', user: new User({ id: 'user-1', name: 'John Doe' }), property: new Property({ id: 'property-1', address: '123 Main St', description: 'A lovely property', maxGuests: 4, pricePerNight: 100, name: 'Cozy Cottage' }), period: new DateRange({ startDate: new Date('2024-07-01'), endDate: new Date('2024-07-05') }), guests: -1 }, errorMessage: 'Guest count must be greater than zero', incorrectParam: 'guests' },
        { props: { id: 'booking-1', user: new User({ id: 'user-1', name: 'John Doe' }), property: new Property({ id: 'property-1', address: '123 Main St', description: 'A lovely property', maxGuests: 4, pricePerNight: 100, name: 'Cozy Cottage' }), period: new DateRange({ startDate: new Date('2024-07-01'), endDate: new Date('2024-07-05') }), guests: 5 }, errorMessage: 'Guest count must be greater than zero and within property max guest limit', incorrectParam: 'guests' },
    ])(
        'should thrown error if booking $incorrectParam is invalid',
        ({ props, errorMessage }) => {
            expect(() => {
                new Booking(props as unknown as any);
            }).toThrowError(errorMessage);
        }
    );

    it('should verify availability of the property', () => {
        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        })

        const user = new User({
            id: "user-1",
            name: "John Doe",
        })

        const dateRange = new DateRange({
            startDate: new Date("2024-07-01"),
            endDate: new Date("2024-07-05"),
        })

        const dateRange2 = new DateRange({
            startDate: new Date("2024-07-02"),
            endDate: new Date("2024-07-10"),
        })

        const booking = new Booking({
            id: "booking-1",
            user,
            property,
            period: dateRange,
            guests: 2,
        });

        property.addBooking(booking);

        expect(property.isAvailable(dateRange2)).toBe(false);

    })

    it('should calculate total price with discount correctly', () => {

        // arrange
        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        });

        const dateRange = new DateRange({
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-10'), // 9 nights
        });

        const booking = new Booking({
            id: "booking-1",
            user: new User({ id: "user-1", name: "John Doe" }),
            property,
            period: dateRange,
            guests: 2,
        });

        // act
        const totalPrice = booking.TotalPrice;

        // assert
        expect(totalPrice).toBe(810); // 10% discount applied
    });

    it('should not make a booking if property is not available', () => {
        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        })
        const user = new User({
            id: "user-1",
            name: "John Doe",
        })

        const dateRange = new DateRange({
            startDate: new Date("2024-07-01"),
            endDate: new Date("2024-07-05"),
        })
        const dateRange2 = new DateRange({
            startDate: new Date("2024-07-03"),
            endDate: new Date("2024-07-07"),
        })
        const booking1 = new Booking({
            id: "booking-1",
            user,
            property,
            period: dateRange,
            guests: 2,
        });
        property.addBooking(booking1);

        expect(property.isAvailable(dateRange2)).toBe(false);

        expect(() => {
            const booking2 = new Booking({
                id: "booking-2",
                user,
                property,
                period: dateRange2,
                guests: 2,
            });
            property.addBooking(booking2);
        }).toThrowError('Property is not available for the selected period');
    });

    it.each([
        { daysBeforeCheckIn: 10, totalPrice: 0 }, // Full refund
        { daysBeforeCheckIn: 5, totalPrice: 250 },  // 50% refund
        { daysBeforeCheckIn: 1, totalPrice: 500 },    // No refund
    ])('should cancel booking with correct refund with correct amount of days remaining to check-in', ({ daysBeforeCheckIn, totalPrice }) => {
        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        });
        const booking = new Booking({
            id: "booking-1",
            user: new User({ id: "user-1", name: "John Doe" }),
            property,
            period: new DateRange({
                startDate: new Date(new Date().getTime() + (daysBeforeCheckIn * 24 * 60 * 60 * 1000)),
                endDate: new Date(new Date().getTime() + ((daysBeforeCheckIn + 5) * 24 * 60 * 60 * 1000)),
            }),
            guests: 2,
        });

        booking.cancel(new Date())

        expect(booking.Status).toBe('CANCELED');
        expect(booking.TotalPrice).toBe(totalPrice); // No refund

    });

    it('should not allow canceling an already canceled booking', () => {
        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        });
        const booking = new Booking({
            id: "booking-1",
            user: new User({ id: "user-1", name: "John Doe" }),
            property,
            period: new DateRange({
                startDate: new Date('2024-07-10'),
                endDate: new Date('2024-07-15'),
            }),
            guests: 2,
        });
        booking.cancel(new Date())

        expect(() => {
            booking.cancel(new Date())
        }).toThrowError('Booking is already canceled');
    });

})