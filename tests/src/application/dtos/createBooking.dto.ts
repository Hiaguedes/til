export interface CreateBookingDTO {
    userId: string;
    propertyId: string;
    startDate: Date;
    endDate: Date;
    guestCount: number;
    guestId: string;
}