function getDateDelta(date1: any, date2: any): number {
  const delta = date2 - date1;
  const days = delta / (1000 * 60 * 60 * 24);
  return Math.floor(days);
}
