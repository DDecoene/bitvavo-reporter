export default function roundFloat(number: number, decimals: number): number {
  return Math.round(number * 10 ** decimals) / 10 ** decimals;
}
