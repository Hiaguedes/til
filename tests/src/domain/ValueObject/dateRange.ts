export class DateRange {
    private readonly startDate: Date
    private readonly endDate: Date
    constructor(props: { startDate: Date; endDate: Date }) {
        const { startDate, endDate } = props
        this.validateDates({ startDate, endDate })

        this.startDate = startDate
        this.endDate = endDate
    }

    private validateDates({ startDate, endDate }: { startDate: Date; endDate: Date }) {
        if (endDate === startDate) {
            throw new Error('End date must not be equal to start date')
        }

        if (endDate < startDate) {
            throw new Error('End date must be after start date')
        }
    }

    get startDateValue() {
        return this.startDate
    }

    get endDateValue() {
        return this.endDate
    }

    getTotalNights(): number {
        const millisecondsPerDay = 1000 * 60 * 60 * 24
        const diffInMs = this.endDate.getTime() - this.startDate.getTime()
        return Math.ceil(diffInMs / millisecondsPerDay)
    }

    overlaps(other: DateRange): boolean {
        return (
            this.startDate < other.endDate && this.endDate > other.startDate
        )
    }
}