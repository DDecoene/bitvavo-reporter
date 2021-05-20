import fs from "fs";

export default async function writeResultsToCsv(values: {
  spentEur: number;
  balanceEur: number;
}): Promise<void> {
  const directory = "./output";

  if (!(await directoryExists(directory))) {
    await fs.promises.mkdir(directory);
  }

  await fs.promises.appendFile(
    directory + "/report.csv",
    new Date().getTime() +
      "," +
      values.spentEur +
      "," +
      values.balanceEur +
      "\n"
  );
}

async function directoryExists(path: string): Promise<boolean> {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
