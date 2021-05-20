import axios from "axios";
import config from "../../config";
import createSignature from "./createSignature";

export default async function callApi<TResponse>(options: {
  method: "GET";
  path: string;
  query?: Record<string, string>;
  body?: Record<string, unknown>;
}): Promise<TResponse> {
  const querySuffix =
    Object.keys(options.query ?? {}).length > 1
      ? "?" + new URLSearchParams(options.query).toString()
      : "";

  const timestamp = Date.now();

  const signature = createSignature(
    timestamp,
    options.method,
    options.path + querySuffix,
    options.body ?? {}
  );

  try {
    const response = await axios.request<TResponse>({
      url: config.apiUrl + options.path + querySuffix,
      timeout: 10_000,
      data:
        options.body && Object.keys(options.body).length > 0
          ? JSON.stringify(options.body)
          : undefined,
      headers: {
        "Content-Type": "application/json",
        "Bitvavo-Access-Key": config.apiKey,
        "Bitvavo-Access-Signature": signature,
        "Bitvavo-Access-Timestamp": timestamp,
        "Bitvavo-Access-Window": config.accessWindow,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    }

    throw error;
  }

  // TODO: Handle rate limits
}
