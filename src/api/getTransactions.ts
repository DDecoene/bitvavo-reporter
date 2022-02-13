import callApi from "./helpers/callApi";

/**
 * Note: Limited to 1,000 items
 */

export interface Transaction {
  id: string;
  timestamp: number;
  market: string;
  side: string;
  amount: number;
  price: number;
  taker: boolean;
  fee: number;
  feeCurrency: string;
  settled: boolean;
}

export type TransactionList = Array<Transaction>

interface TransactionResult {
  id: string;
  timestamp: number;
  market: string;
  side: string;
  amount: string;
  price: string;
  taker: boolean;
  fee: string;
  feeCurrency: string;
  settled: boolean;
}

type TransactionResultList = Array<TransactionResult>

export async function getTransactions(options: { market: string; }): Promise<TransactionList> {

  const response = await callApi<TransactionResultList>({
    method: "GET",
    path: "/trades",
    query: {
      ...options,
      limit: "1000",
    },
  });

  return response.map((trade) => ({
    id: trade.id,
    timestamp: trade.timestamp,
    market: trade.market,
    side: trade.side,
    amount: parseFloat(trade.amount),
    price: parseFloat(trade.price),
    taker: trade.taker,
    fee: parseFloat(trade.fee),
    feeCurrency: trade.feeCurrency,
    settled: trade.settled
  }));
}
