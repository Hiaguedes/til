import type { Property } from "../entities/property";

export interface IPropertyRepository {
    findById(id: string): Promise<Property | null>;
    save(user: Property): Promise<void>;
}