import formatEuros from "./formatting/formatEuros";
import roundFloat from "./formatting/roundFloat";

export default function printResults({
  spentEur,
  balanceEur,
}: {
  spentEur: number;
  balanceEur: number;
}): void {
  const percentage = roundFloat((100 * balanceEur) / spentEur - 100, 2);

  console.log();
  console.log(`Spent: ${formatEuros(spentEur)}`);
  console.log(`Balance: ${formatEuros(balanceEur)}`);
  console.log(`Profit: ${formatEuros(balanceEur - spentEur)} (${percentage}%)`);
}
