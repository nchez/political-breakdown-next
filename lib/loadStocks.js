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
export async function loadFinnHubStockNews(symbol) {
  function addDays(date, days) {
    var result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }
  function convertToTwoDigitDate(date) {
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    const year = date.getFullYear().toString()
    if (month.length === 1) {
      month = '0' + month
    }
    if (day.length === 1) {
      day = '0' + day
    }
    const apiDate = year + '-' + month + '-' + day
    return apiDate
  }
  const currentDate = convertToTwoDigitDate(new Date(Date.now()))
  const weekAgoDate = convertToTwoDigitDate(addDays(currentDate, -7))

  const config = {
    headers: {
      accept: 'application/json',
      'X-Finnhub-Token': process.env.FINNHUB_API_KEY,
    },
  }
  const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol.toUpperCase()}&from=${weekAgoDate}&to=${currentDate}&token=`
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
