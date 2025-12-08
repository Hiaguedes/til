import { beforeEach, describe, it, expect } from "vitest";
import { PropertyService } from "./property.service";
import { MockPropertyRepository } from "../../infra/repositories/property.repository.mock";
import { Property } from "../../domain/entities/property";

describe('Product Service', () => {
    let propertyService: PropertyService;
    let mockPropertyRepository: MockPropertyRepository;

    beforeEach(() => {
        mockPropertyRepository = new MockPropertyRepository()
        propertyService = new PropertyService({
            repository: mockPropertyRepository
        })
    })

    it.each([
        { param: 'repository', props: { repository: null }, errorMessage: 'Repository cannot be null' },
    ])
        ("should throw error if param $param is incorrect", ({ errorMessage, props: { repository } }) => {
            expect(() => {
                new PropertyService({ repository: repository as unknown as any });
            }).toThrowError(errorMessage);
        });

    it("should return null if an invalid id is provided", async () => {
        const property = await propertyService.findPropertyById("invalid-id");
        expect(property).toBeNull();
    });

    it("should return a property object if a valid id is provided", async () => {
        const property = await propertyService.findPropertyById("1");
        expect(property).not.toBeNull();
        expect(property?.Id).toBe("1");
        expect(property?.Address).toBe("fake address");
    });

    it.each([
        { id: "3", name: "Cozy Cottage", address: "123 Main St", maxGuests: 5, pricePerNight: 150 },
        { id: "4", name: "Modern Apartment", address: "456 Elm St", maxGuests: 3, pricePerNight: 200 },
    ])("should save a new property correctly", async ({ address, id, maxGuests, name, pricePerNight }) => {
        const property = new Property({ id, name, address, maxGuests, pricePerNight });
        await propertyService.save(property);
        const savedProperty = await propertyService.findPropertyById(id);
        expect(savedProperty).not.toBeNull();
        expect(savedProperty?.Id).toBe(id);
        expect(savedProperty?.Name).toBe(name);
        expect(savedProperty?.Address).toBe(address);
        expect(savedProperty?.MaxGuests).toBe(maxGuests);
        expect(savedProperty?.PricePerNight).toBe(pricePerNight);
    });

})