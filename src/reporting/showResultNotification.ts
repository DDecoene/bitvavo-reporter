import notifier from "node-notifier";
import formatEuros from "./formatting/formatEuros";
import roundFloat from "./formatting/roundFloat";

export default function showResultNotification({
  spentEur,
  balanceEur,
}: {
  spentEur: number;
  balanceEur: number;
}): void {
  const percentage = roundFloat((100 * balanceEur) / spentEur - 100, 2);

  notifier.notify({
    title: "Profit",
    message: `${formatEuros(balanceEur - spentEur)} (${percentage}%)`,
  });
}
