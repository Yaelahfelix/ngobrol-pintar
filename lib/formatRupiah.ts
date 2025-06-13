export function formatRupiah(value: number | string): string {
  const number = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
}
