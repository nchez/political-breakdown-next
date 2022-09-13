const axios = require('axios')

export async function loadStocks() {
  const response = await fetch('http://localhost:3001/stocks')
  return response.json()
}

export async function loadSingleStockPrices(symbol) {
  const response = await fetch(`http://localhost:3001/stocks/${symbol}`)
  return response.json()
}

export async function loadFinnHubStockProfile(symbol) {
  const config = {
    headers: {
      accept: 'application/json',
      'X-Finnhub-Token': process.env.FINNHUB_API_KEY,
    },
  }
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol.toUpperCase()}&token=`
  const response = await axios.get(url, config)
  const { data } = response
  return data
}

export async function loadSingleStockInfo(symbol) {
  const response = await fetch(`http://localhost:3001/stocks/${symbol}/info`)
  return response.json()
}

export async function loadSingleStockTrades(symbol, start, rows) {
  const response = await fetch(`http://localhost:3001/trades/stocks/${symbol}`)
  const { trades } = await response.json()
  const slicedTrades = trades.slice(start, start + rows)
  return { trades: slicedTrades }
}
