// grab congressmember data - transactions, congressinfo, sunlight api info
const db = require('../../../../../server/models')

export default async function handler(req, res) {
  const { lastName } = req.query
  console.time('propublica')
  const [foundStock, foundTransactions, foundPrices] = await Promise.all([
    db.Stock.findOne({ symbol: stock }),
    db.Transaction.find({ representative: lastName }),
    db.Price.find({ symbol: stock }).limit(300),
  ])
  console.timeEnd('propublica')
  res.status(200).json({
    stock: foundStock,
    transactions: foundTransactions,
    prices: foundPrices,
  })
}
