export default function formatRupiah(number) {
  return Intl.NumberFormat("id").format(number);
}
