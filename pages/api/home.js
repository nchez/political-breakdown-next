import clientPromise from '../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_URI)
  console.time('apicall')
  const stockInfo = await db
    .collection('stocks')
    .find({}, { projection: { transactions: 0, _id: 0 } })
    .sort({ txnCount: -1 })
    .limit(10)
    .toArray()

  console.timeEnd('apicall')
  res.json({
    stocks: stockInfo,
  })
}
