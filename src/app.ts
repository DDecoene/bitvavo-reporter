import { getTransactions, TransactionList } from "./api/getTransactions";
import getActiveMarkets from "./api/getActiveMarkets";
import writeCoinstatsCSV from "./reporting/writeCoinstatsCSV";
import writeCointrackerCSV from "./reporting/writeCointrackerCSV";

async function main(): Promise<void> {

  let tl: TransactionList = []
  const markets: Array<string> = await getActiveMarkets()

  for (const market of markets) {
    const trades = await getTransactions({ market: market })
    //console.log("market", market, "t", trades)
    for (const trade of trades) {
      tl.push(trade)
    }
  }

  //await writeCoinstatsCSV(tl)
  await writeCointrackerCSV(tl)

  console.log("Done.")

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });