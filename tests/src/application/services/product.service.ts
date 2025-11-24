import { Property } from "../../domain/entities/property";
import type { IPropertyRepository } from "../../domain/repositories/property.repository";

export class ProductService {
    private readonly propertyRepository: IPropertyRepository

    constructor(props: { repository: IPropertyRepository }) {
        this.validateParams({ ...props });
        this.propertyRepository = props.repository
    }

    validateParams({ repository }: { repository: IPropertyRepository }) {
        if (!repository) {
            throw new Error('Repository cannot be null')
        }
    }

    async findPropertyById(id: string): Promise<Property | null> {
        return this.propertyRepository.findById(id);
    }

    async save(property: Property): Promise<void> {
        return this.propertyRepository.save(property);
    }
}