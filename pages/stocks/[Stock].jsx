import React from 'react'
import { useRouter } from 'next/router'
import TransactionsTable from '../../components/TransactionsTable'
import {
  loadStocks,
  loadSingleStockPrices,
  loadSingleStockTrades,
} from '../../lib/loadStocks'
import StockTxnCountGraph from '../../components/StockTxnCountGraph'
// import dynamic from 'next/dynamic'

// const DynamicPlot = dynamic(import('../../components/StockTxnCountGraph'), {
//   ssr: false,
// })

export default function Stock({ prices, trades }) {
  const router = useRouter()
  const { Stock } = router.query
  return (
    <>
      <h1>Stock Symbol: {prices[0].symbol.toUpperCase()}</h1>
      <StockTxnCountGraph prices={prices} />
      <h3>Length of price array: {prices.length}</h3>
      <TransactionsTable symbol={Stock.toLowerCase()} trades={trades} />
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
  const [{ prices }, { trades }] = await Promise.all([
    loadSingleStockPrices(params.Stock),
    loadSingleStockTrades(params.Stock),
  ])
  return {
    props: { prices: prices, trades: trades },
  }
}
