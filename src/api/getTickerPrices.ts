import callApi from "./helpers/callApi";

export default async function getTickerPrices(
  options: {
    symbol?: string;
  } = {}
): Promise<
  Array<{
    market: string;
    price: number;
  }>
> {
  const response = await callApi<
    Array<{
      market: string;
      price: string;
    }>
  >({
    method: "GET",
    path: "/ticker/price",
    query: options,
  });

  return response.map((market) => ({
    market: market.market,
    price: parseFloat(market.price),
  }));
}
