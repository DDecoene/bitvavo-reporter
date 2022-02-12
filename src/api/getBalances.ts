import axios from "axios";
import config from "../config";
import callApi from "./helpers/callApi";
import createSignature from "./helpers/createSignature";

interface BalanceResult {
  symbol: string;
  available: string;
  inOrder: string;
}

interface Balance {
  symbol: string;
  available: number;
  inOrder: number;
}

type BalanceResultList = Array<BalanceResult>
type BalanceList = Array<Balance>

export default async function getBalances(options: { symbol?: string } = {}): Promise<BalanceList> {
  const response = await callApi<BalanceResultList>({
    method: "GET",
    path: "/balance",
    query: options,
  });

  let r: BalanceList = []

  response.forEach(
    (b: BalanceResult) => {
      r.push(
        {
          symbol: b.symbol,
          available: parseFloat(b.available),
          inOrder: parseFloat(b.inOrder)
        })
    }
  )

  return r
}
