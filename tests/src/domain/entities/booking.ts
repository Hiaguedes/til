import { RefundRuleFactory } from "../cancelation/refundFactory"
import type { DateRange } from "../ValueObject/dateRange"
import type { Property } from "./property"
import type { User } from "./user"

export class Booking {
    private readonly id: string
    private readonly user: User
    private readonly property: Property
    private readonly period: DateRange
    private readonly guests: number
    private status: 'PENDING' | 'CONFIRMED' | 'VACANT' | 'CANCELED' = 'VACANT'
    private totalPrice: number = 0


    constructor(props: { id: string; user: User; property: Property; period: DateRange; guests: number, status?: 'PENDING' | 'CONFIRMED' | 'VACANT' }) {
        this.validateParams({ ...props });
        this.id = props.id
        this.user = props.user
        this.property = props.property
        this.period = props.period
        this.guests = props.guests
        if (props.status) {
            this.status = props.status
        }
        this.totalPrice = this.property.calculateTotalPrice(this.period);

        this.property.addBooking(this);
    }

    validateParams(props: { id: string; user: User; property: Property; period: DateRange; guests: number }) {
        const { id, user, property, period, guests } = props;
        if (!id) {
            throw new Error('ID cannot be empty')
        }
        if (!user) {
            throw new Error('User cannot be empty')
        }
        if (!property) {
            throw new Error('Property cannot be empty')
        }
        if (!period) {
            throw new Error('Period cannot be empty')
        }
        if (guests <= 0) {
            throw new Error('Guest count must be greater than zero')
        }

        if (!property.validateGuestCount(guests)) {
            throw new Error('Guest count must be greater than zero and within property max guest limit')
        };

        if (!property.isAvailable(period)) {
            throw new Error('Property is not available for the selected period')
        }
    }

    confirmBooking() {
        this.status = 'CONFIRMED'
    }

    cancel(dateOfCancellation: Date) {
        if (this.status === 'CANCELED') {
            throw new Error('Booking is already canceled')
        }
        this.status = 'CANCELED'

        const checkInDate = this.period.startDateValue;
        const timeDiff = checkInDate.getTime() - dateOfCancellation.getTime();
        const daysBeforeCheckIn = Math.ceil(timeDiff / (1000 * 3600 * 24));

        this.totalPrice = RefundRuleFactory.getRefundRule(daysBeforeCheckIn).calculateRefund(this.totalPrice);

    }

    get TotalPrice() {
        return this.totalPrice
    }

    get Id() {
        return this.id
    }
    get User() {
        return this.user
    }
    get Property() {
        return this.property
    }
    get Period() {
        return this.period
    }
    get getGuestCount() {
        return this.guests
    }
    get Status() {
        return this.status
    }
}