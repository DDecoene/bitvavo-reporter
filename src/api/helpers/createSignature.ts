import config from "../../config";
import { createHmac } from "crypto";

export default function createSignature(
  timestamp: number,
  method: "GET",
  url: string,
  body: Record<string, unknown>
) {
  let string = timestamp + method + "/v2" + url;

  if (Object.keys(body).length !== 0) {
    string += JSON.stringify(body);
  }

  return createHmac("sha256", config.apiSecret).update(string).digest("hex");
}
