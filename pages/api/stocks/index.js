import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_URI)
  const stockInfo = await db
    .collection('stocks')
    .find({}, { projection: { transactions: 0 } })
    .toArray()
  res.json({
    stocks: stockInfo,
  })
}
