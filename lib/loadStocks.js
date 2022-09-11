export async function loadStocks() {
  const response = await fetch('http://localhost:3001/stocks')
  return response.json()
}

export async function loadSingleStockPrices(symbol) {
  const response = await fetch(`http://localhost:3001/stocks/${symbol}`)
  return response.json()
}

export async function loadSingleStockTrades(symbol) {
  const response = await fetch(`http://localhost:3001/trades/stocks/${symbol}`)
  return response.json()
}
