interface IDateProvider {
    compareInHoursWithToday(end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
}

export { IDateProvider };
