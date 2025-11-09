export type PropertyProps = {
    id: string;
    address: string;
    name: string;
    description?: string;
    maxGuests: number;
    pricePerNight: number;
}

export class Property {
    private readonly id: string
    private readonly address: string
    private readonly description?: string
    private readonly maxGuests: number;
    private readonly pricePerNight: number;
    private readonly name: string;

    constructor(props: PropertyProps) {
        this.validateParams({ ...props });
        this.id = props.id;
        this.address = props.address;
        this.description = props.description;
        this.maxGuests = props.maxGuests;
        this.pricePerNight = props.pricePerNight;
        this.name = props.name;
    }

    validateParams(props: PropertyProps) {
        const { id, address, maxGuests, pricePerNight, name } = props;
        if (!id) {
            throw new Error('ID cannot be empty')
        }

        if (!address) {
            throw new Error('Address cannot be empty')
        }

        if (maxGuests <= 0) {
            throw new Error('Max guests must be greater than zero')
        }

        if (pricePerNight <= 0) {
            throw new Error('Price per night must be greater than zero')
        }

        if (!name) {
            throw new Error('Name cannot be empty')
        }

    }

    validateGuestCount(guestCount: number): boolean {
        return guestCount <= this.maxGuests;
    }

    calculateTotalPrice(dateRange: { getTotalNights: () => number }): number {
        const nights = dateRange.getTotalNights();
        let discount = 0;

        if (nights < 7) {
            discount = 0;
        }

        if (nights >= 7) {
            discount = 0.1; // 10% discount
        }

        const total = this.pricePerNight * nights;
        return total - (total * discount);
    }

    get Id() {
        return this.id
    }

    get Address() {
        return this.address
    }

    get Description() {
        return this.description
    }

    get MaxGuests() {
        return this.maxGuests
    }

    get PricePerNight() {
        return this.pricePerNight
    }

    get Name() {
        return this.name
    }
}