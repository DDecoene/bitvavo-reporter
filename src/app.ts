import writeResultsToCsv from "./reporting/writeResults";
import getTotalBalance from "./api/getTotalBalance";
import getTotalSpent from "./api/getTotalDeposited";
import showResultNotification from "./reporting/showResultNotification";
import config from "./config";

async function run(): Promise<void> {
  const [spentEur, balanceEur] = await Promise.all([
    getTotalSpent("EUR"),
    getTotalBalance("EUR"),
  ]);

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
