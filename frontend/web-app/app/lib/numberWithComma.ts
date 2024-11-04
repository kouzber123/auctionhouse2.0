export function numberWithCommas(amount: number) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
