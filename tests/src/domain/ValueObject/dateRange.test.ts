import { describe, expect, it } from 'vitest'
import { DateRange } from './dateRange'

describe('Date Range Value Object', () => {
    it('should create a valid DateRange', () => {
        const dateRange = new DateRange({
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-01-10'),
        })

        expect(dateRange.startDateValue).toEqual(new Date('2024-01-01'))
        expect(dateRange.endDateValue).toEqual(new Date('2024-01-10'))
    });

    it('should trhown error if endDate is before startDate', () => {
        expect(() => {
            new DateRange({
                startDate: new Date('2024-01-10'),
                endDate: new Date('2024-01-05'),
            })
        }).toThrowError('End date must be after start date')
    });

    it('should trhown error if endDate is equal startDate', () => { // caso de teste chamado de edge cases
        expect(() => {
            const date = new Date('2024-01-10')
            new DateRange({
                startDate: date,
                endDate: date,
            })
        }).toThrowError('End date must not be equal to start date')
    });

    // it('should calculate the correct total of nights in the range', () => {
    //     const dateRange = new DateRange({
    //         startDate: new Date('2024-01-01'),
    //         endDate: new Date('2024-01-11'),
    //     })

    //     expect(dateRange.getTotalNights()).toBe(10);
    // }); // teste fragil pois testo apenas um range especifico

    it.each([ // no vitest pra iterar por diversos casos de teste especificos
        // essa iteracao nos chamamos de triangulation
        { start: '2024-01-01', end: '2024-01-02', expectedNights: 1 },
        { start: '2024-01-01', end: '2024-01-11', expectedNights: 10 },
        { start: '2024-01-15', end: '2024-01-20', expectedNights: 5 },
        { start: '2024-02-01', end: '2024-02-29', expectedNights: 28 }, // ano bissexto
        { start: '2024-01-25', end: '2024-02-05', expectedNights: 11 },
    ])(
        'should calculate total nights from $start to $end as $expectedNights',
        ({ start, end, expectedNights }) => {
            const dateRange = new DateRange({
                startDate: new Date(start),
                endDate: new Date(end),
            })
            expect(dateRange.getTotalNights()).toBe(expectedNights)
        }
    )

    it.each([
        { range1Start: '2024-01-01', range1End: '2024-01-10', range2Start: '2024-01-05', range2End: '2024-01-15', expectedOverlap: true },
        { range1Start: '2024-01-01', range1End: '2024-01-10', range2Start: '2024-01-10', range2End: '2024-01-20', expectedOverlap: false },
        { range1Start: '2024-01-15', range1End: '2024-01-25', range2Start: '2024-01-10', range2End: '2024-01-14', expectedOverlap: false },
        { range1Start: '2024-02-01', range1End: '2024-02-10', range2Start: '2024-02-05', range2End: '2024-02-15', expectedOverlap: true },
        { range1Start: '2024-03-01', range1End: '2024-03-10', range2Start: '2024-03-11', range2End: '2024-03-20', expectedOverlap: false },
    ])('should verify if two date ranges overlap: firstRange $range1Start-$range2End, secondRange $range2Start-$range2End',
        ({ range1Start, range1End, range2Start, range2End, expectedOverlap }) => {
            const range1 = new DateRange({
                startDate: new Date(range1Start),
                endDate: new Date(range1End),
            })

            const range2 = new DateRange({
                startDate: new Date(range2Start),
                endDate: new Date(range2End),
            })

            const overlap = range1.overlaps(range2);

            expect(overlap).toBe(expectedOverlap);
        });
})