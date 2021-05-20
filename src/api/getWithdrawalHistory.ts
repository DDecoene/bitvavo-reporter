import callApi from "./helpers/callApi";

/**
 * Note: Limited to 1,000 items
 */
export default async function getWithdrawalHistory(
  options: {
    symbol?: string;
  } = {}
): Promise<
  Array<{
    timestamp: Date;
    symbol: string;
    amount: number;
    fee: number;
  }>
> {
  const response = await callApi<
    Array<{
      timestamp: number;
      symbol: string;
      amount: string;
      address: string;
      paymentId?: string;
      txId?: string;
      fee: string;
    }>
  >({
    method: "GET",
    path: "/withdrawalHistory",
    query: {
      ...options,
      limit: "1000",
    },
  });

  return response.map((withdrawal) => ({
    timestamp: new Date(withdrawal.timestamp),
    symbol: withdrawal.symbol,
    amount: parseFloat(withdrawal.amount),
    fee: parseFloat(withdrawal.fee),
  }));
}
