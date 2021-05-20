import axios from "axios";
import config from "../config";
import callApi from "./helpers/callApi";
import createSignature from "./helpers/createSignature";

export default async function getBalances(
  options: {
    symbol?: string;
  } = {}
): Promise<
  Array<{
    symbol: string;
    available: number;
    inOrder: number;
  }>
> {
  const response = await callApi<
    Array<{
      symbol: string;
      available: string;
      inOrder: string;
    }>
  >({
    method: "GET",
    path: "/balance",
    query: options,
  });

  return response.map((currency) => ({
    symbol: currency.symbol,
    available: parseFloat(currency.available),
    inOrder: parseFloat(currency.inOrder),
  }));
}
