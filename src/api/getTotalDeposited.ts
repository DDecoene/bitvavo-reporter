import getDepositHistory from "./getDepositHistory";

export default async function getTotalSpent(symbol: string): Promise<number> {
  const history = await getDepositHistory({ symbol });

  return history.reduce(
    (result, deposit) => result + deposit.amount + deposit.fee,
    0
  );
}
