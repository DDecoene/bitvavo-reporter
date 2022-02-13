import { getBalances } from "./getBalances"

export default async function (): Promise<string[]> {
    let markets: string[] = []
    const balances = await getBalances()

    balances.forEach((balance) => {
        if (balance.symbol === "EUR") { return }
        let market = `${balance.symbol}-EUR`
        markets.push(market)
    })
    
    return markets
}