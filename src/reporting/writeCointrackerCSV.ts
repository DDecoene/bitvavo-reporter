import fs from "fs";
import moment from "moment";
import { TransactionList } from "../api/getTransactions";

export default async function writeCointrackerCSV(transactionList: TransactionList): Promise<void> {
    const directory = "./output";

    if (!(await directoryExists(directory))) {
        await fs.promises.mkdir(directory);
    }

    //Date,Received Quantity,Received Currency,Sent Quantity,Sent Currency,Fee Amount,Fee Currency,Tag
    const filename = `${directory}/cointracker_${Date.now()}.csv`
    await fs.promises.appendFile(filename,'Date,Received Quantity,Received Currency,Sent Quantity,Sent Currency,Fee Amount,Fee Currency,Tag\n')

    for (const transaction of transactionList) {
        
        const coinSymbol = transaction.market.split("-")[0]
        //"7/22/2019, 7:37:58 PM"
        const strTransactionDate = moment(transaction.timestamp).format("MM/DD/YYYY hh:mm:ss")
        const sentAmount = (transaction.amount * transaction.price)+transaction.fee

        await fs.promises.appendFile(filename,
            `${strTransactionDate},${transaction.amount},${coinSymbol},${sentAmount},${transaction.feeCurrency},${transaction.fee},${transaction.feeCurrency}}\r\n`
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
