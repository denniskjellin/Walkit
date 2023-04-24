// function to format numbers to Swedish format
export function numberToSweString(number) {
  return number.toLocaleString("sv-SE", { minimumFractionDigits: 0 });
}
