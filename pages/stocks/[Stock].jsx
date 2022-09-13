import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import TransactionsTable from '../../components/TransactionsTable'
import { loadStocks, loadSingleStockPrices } from '../../lib/loadStocks'
import StockTxnCountGraph from '../../components/StockTxnCountGraph'

export default function Stock({ prices, trades }) {
  const router = useRouter()
  const { Stock } = router.query

  return (
    <>
      <h1>Stock Symbol: {Stock.toUpperCase()}</h1>

      <StockTxnCountGraph prices={prices} />

      <h3>Length of price array: {prices.length}</h3>
      <TransactionsTable symbol={Stock.toLowerCase()} />
    </>
  )
}

export async function getStaticPaths() {
  const { stocks } = await loadStocks()
  const paths = stocks.map((element) => ({
    params: {
      Stock: element.symbol,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { prices } = await loadSingleStockPrices(params.Stock)
  return {
    props: { prices: prices },
  }
}
