import callApi from "./helpers/callApi";

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
export type BalanceList = Array<Balance>

export async function getBalances(options: { symbol?: string } = {}): Promise<BalanceList> {
  const response = await callApi<BalanceResultList>({
    method: "GET",
    path: "/balance",
    query: options,
  });

  let r: BalanceList = []

  response.forEach(
    (b) => {
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
