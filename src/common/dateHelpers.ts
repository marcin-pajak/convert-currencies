const stringToTimestamp = (date: string) => new Date(date).getTime();

export const substractDays = (day: string, daysQty: number): number =>
  stringToTimestamp(day) - daysQty * 24 * 60 * 60 * 1000;
