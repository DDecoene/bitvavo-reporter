import getBalances from "./getBalances";
import getTickerPrices from "./getTickerPrices";

export default async function getTotalBalance(
  currency: "EUR" | "BTC"
): Promise<number> {
  const [balances, prices] = await Promise.all([
    getBalances(),
    getTickerPrices(),
  ]);

  return balances.reduce((result, balance) => {
    if (balance.symbol === currency) {
      return result + balance.available;
    }

    const marketName = balance.symbol + "-" + currency;
    const price = prices.find(({ market }) => market === marketName);

    if (typeof price === "undefined") {
      throw new Error(`Cannot find price for market ${marketName}`);
    }

    return (
      result + balance.available * price.price + balance.inOrder * price.price
    );
  }, 0);
}
