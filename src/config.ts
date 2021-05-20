export default {
  apiUrl: "https://api.bitvavo.com/v2",
  apiKey: getEnv("BITVAVO_API_KEY"),
  apiSecret: getEnv("BITVAVO_API_SECRET"),
  accessWindow: 10_000,
  notificationIntervalMinutes: 10,
};

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable "${key}" not found`);
  }

  return value;
}
