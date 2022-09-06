// grab stock data - price for last 365 business days, transactions

import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const { stockSymbol } = req.query
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_URI)
  console.time('apicall')
  const [stockInfo, prices] = await Promise.all([
    db
      .collection('stocks')
      .find(
        { symbol: stockSymbol },
        { projection: { transactions: 0, _id: 0 } }
      )
      .toArray(),
    db
      .collection('prices')
      .find({ symbol: stockSymbol })
      .sort({ date: -1 })
      .limit(365)
      .toArray(),
  ])
  console.timeEnd('apicall')
  res.json({
    stock: stockInfo,
    price: prices.sort((a, b) => a.date - b.date),
  })
}
