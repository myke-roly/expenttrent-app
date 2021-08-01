export const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const date = new Date();
export const THIS_MONTH = monthName[date.getMonth()];

export function filterByMonth(item: any, month: string) {
  const THIS_YEAR = date.getFullYear();
  const filterByMonth = monthName[item.createAt.toDate().getMonth()];
  const filterByYeard = item.createAt.toDate().getFullYear();

  return filterByMonth === month && filterByYeard === THIS_YEAR;
}
