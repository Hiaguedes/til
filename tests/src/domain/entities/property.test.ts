import { describe, it, expect } from "vitest";
import { Property } from "./property";
import { DateRange } from "../ValueObject/dateRange";

describe("Property Entity", () => {
    it("should create new instance of Property normally", () => {
        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        });

        expect(property).toBeInstanceOf(Property);
        expect(property.Id).toBe("property-1");
        expect(property.Address).toBe("123 Main St");
        expect(property.Description).toBe("A lovely property");
        expect(property.MaxGuests).toBe(4);
        expect(property.PricePerNight).toBe(100);
        expect(property.Name).toBe("Cozy Cottage");
    });

    it.each([
        { props: { id: '', address: '123 Main St', maxGuests: 4, pricePerNight: 100, name: 'Cozy Cottage' }, errorMessage: 'ID cannot be empty', incorrectParam: 'id' },
        { props: { id: 'property-1', address: '', maxGuests: 4, pricePerNight: 100, name: 'Cozy Cottage' }, errorMessage: 'Address cannot be empty', incorrectParam: 'address' },
        { props: { id: 'property-1', address: '123 Main St', maxGuests: 0, pricePerNight: 100, name: 'Cozy Cottage' }, errorMessage: 'Max guests must be greater than zero', incorrectParam: 'maxGuests' },
        { props: { id: 'property-1', address: '123 Main St', maxGuests: -1, pricePerNight: 100, name: 'Cozy Cottage' }, errorMessage: 'Max guests must be greater than zero', incorrectParam: 'maxGuests' },
        { props: { id: 'property-1', address: '123 Main St', maxGuests: 4, pricePerNight: 0, name: 'Cozy Cottage' }, errorMessage: 'Price per night must be greater than zero', incorrectParam: 'pricePerNight' },
        { props: { id: 'property-1', address: '123 Main St', maxGuests: 4, pricePerNight: 100, name: '' }, errorMessage: 'Name cannot be empty', incorrectParam: 'name' },
    ])(
        'should thrown error if property $incorrectParam is invalid',
        ({ props, errorMessage }) => {
            expect(() => {
                new Property(props);
            }).toThrowError(errorMessage);
        }
    );

    it.each([
        { guestCount: 5, maxGuest: 4, expected: false },
        { guestCount: 4, maxGuest: 2, expected: false },
        { guestCount: 3, maxGuest: 6, expected: true },
    ])
        ('should validate max guest count correctly: $guestCount <= $maxGuest', ({ guestCount, maxGuest, expected }) => {
            const property = new Property({
                id: "property-1",
                address: "123 Main St",
                description: "A lovely property",
                maxGuests: maxGuest,
                pricePerNight: 100,
                name: "Cozy Cottage",
            });

            expect(property.validateGuestCount(guestCount)).toBe(expected);
        });

    it('should not have apply discount for staying less than 7 nights', () => {
        const property = new Property({
            id: "property-1",
            address: "123 Main St",
            description: "A lovely property",
            maxGuests: 4,
            pricePerNight: 100,
            name: "Cozy Cottage",
        });
        const dateRange = new DateRange({ // acoplamento entre entity e value object
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-05'),
        });

        const totalPrice = property.calculateTotalPrice(dateRange);
        expect(totalPrice).toBe(400); // 4 nights * 100 per night
    });

    it.each([
        { start: '2024-01-01', end: '2024-01-08', expected: 630 }, // 7 nights
        { start: '2024-01-01', end: '2024-01-10', expected: 810 }, // 9 nights
        { start: '2024-01-01', end: '2024-01-15', expected: 1260 }, // 14 nights
    ])
        ('should apply discount for staying more than 7 nights or equal 7', ({ start, end, expected }) => {
            const property = new Property({
                id: "property-1",
                address: "123 Main St",
                description: "A lovely property",
                maxGuests: 4,
                pricePerNight: 100,
                name: "Cozy Cottage",
            });
            const dateRange = new DateRange({
                startDate: new Date(start),
                endDate: new Date(end),
            });
            const totalPrice = property.calculateTotalPrice(dateRange);
            expect(totalPrice).toBe(expected);
        });
});