import fs from "fs";
import moment from "moment";
import { TransactionList } from "../api/getTransactions";

export default async function writeCoinstatsCSV(transactionList: TransactionList): Promise<void> {
    const directory = "./output";

    if (!(await directoryExists(directory))) {
        await fs.promises.mkdir(directory);
    }

    //Coin Symbol,Exchange,Pair,Type,Amount,Price,Fee,Date,Notes
    const filedate = Date.now()
    await fs.promises.appendFile(`${directory}/transactions_${filedate}.csv`,'Coin Symbol,Exchange,Pair,Type,Amount,Price,Fee,Date,Notes\n')

    for (const transaction of transactionList) {
        
        const coinSymbol = transaction.market.split("-")[0]
        //"7/22/2019, 7:37:58 PM"
        const strTransactionDate = moment(transaction.timestamp).format("M/D/YYYY, h:m:s a")

        await fs.promises.appendFile(`${directory}/transactions_${filedate}.csv`,
            `${coinSymbol},Bitvavo,${transaction.market},${transaction.side},${transaction.amount},${transaction.price},${transaction.fee},"${strTransactionDate}",${transaction.id}\n`
        );
    }
}

async function directoryExists(path: string): Promise<boolean> {
    try {
        await fs.promises.access(path, fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}
