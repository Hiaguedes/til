import { Property } from "../../domain/entities/property";
import type { IPropertyRepository } from "../../domain/repositories/property.repository";

export class MockPropertyRepository implements IPropertyRepository {
    private properties: Property[] = [
        new Property({ id: "1", address: "fake address", maxGuests: 4, name: 'Hotel Premium Lounge', pricePerNight: 1000 }),
        new Property({ id: "2", address: "another fake address", maxGuests: 2, name: 'Super nice cozy place', pricePerNight: 100, description: 'a fake description' })
    ];

    async findById(id: string): Promise<Property | null> {
        return this.properties.find(properties => properties.Id === id) || null;
    }

    async save(property: Property): Promise<void> {
        this.properties.push(property);
    }
}