// grab stock data - price for last 365 business days, transactions

import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const { stockSymbol } = req.query
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_URI)
  const [stockInfo, prices] = await Promise.all([
    db
      .collection('stocks')
      .find({ symbol: stockSymbol }, { projection: { transactions: 0 } })
      .toArray(),
    db
      .collection('prices')
      .find({ symbol: stockSymbol })
      .sort({ date: -1 })
      .limit(180)
      .toArray(),
  ])
  res.json({
    stock: stockInfo,
    price: prices.sort((a, b) => a.date - b.date),
  })
}
