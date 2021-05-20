import writeResultsToCsv from "./reporting/writeResults";
import getTotalBalance from "./api/getTotalBalance";
import showResultNotification from "./reporting/showResultNotification";
import config from "./config";
import getDepositHistory from "./api/getDepositHistory";
import getWithdrawalHistory from "./api/getWithdrawalHistory";

async function run(): Promise<void> {
  const [depositHistory, withdrawalsHistory, balanceEur] = await Promise.all([
    getDepositHistory({ symbol: "EUR" }),
    getWithdrawalHistory({ symbol: "EUR" }),
    getTotalBalance("EUR"),
  ]);

  const spentEur =
    depositHistory.reduce(
      (result, deposit) => result + deposit.amount + deposit.fee,
      0
    ) -
    withdrawalsHistory.reduce(
      (result, withdrawal) => result + withdrawal.amount + withdrawal.fee,
      0
    );

  await writeResultsToCsv({ spentEur, balanceEur });
  showResultNotification({ spentEur, balanceEur });

  console.log("Results reported");
}

const minutes = config.notificationIntervalMinutes;

console.log(`Notifications will show every ${minutes} minutes`);

run();

setInterval(() => {
  run();
}, minutesToMillis(minutes));

function minutesToMillis(minutes: number): number {
  return minutes * 60_000;
}
