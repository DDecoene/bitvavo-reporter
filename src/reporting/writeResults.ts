import fs from "fs";

export default async function writeResultsToCsv(values: {
  spentEur: number;
  balanceEur: number;
}): Promise<void> {
  await fs.promises.appendFile(
    "./output/report.csv",
    new Date().getTime() +
      "," +
      values.spentEur +
      "," +
      values.balanceEur +
      "\n"
  );
}
