export async function loadStocks() {
  const response = await fetch('http://localhost:3000/api/stocks')
  const stocks = response.json()
  return stocks
}

export async function loadSingleStock(symbol) {
  const response = await fetch(`http://localhost:3000/api/stocks/${symbol}`)
  const prices = response.json()
  return prices
}
