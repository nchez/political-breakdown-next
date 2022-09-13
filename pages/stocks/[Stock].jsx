import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQueryClient, useQuery } from 'react-query'
import TransactionsTable from '../../components/TransactionsTable'
import {
  loadStocks,
  loadSingleStockPrices,
  loadSingleStockInfo,
  loadFinnHubStockProfile,
} from '../../lib/loadStocks'
import StockTxnCountGraph from '../../components/StockTxnCountGraph'

export default function Stock({ prices, profile }) {
  console.log(profile)
  const router = useRouter()
  const { Stock } = router.query

  const queryClient = useQueryClient()
  const { data, status, error } = useQuery(
    ['loadStockInfo', Stock],
    async () => {
      const data = await loadSingleStockInfo(Stock)
      return data
    },
    { keepPreviousData: true }
    // in ms}
  )

  const title = (
    <>
      <h1>
        {data ? `${data.stock.name} (${Stock.toUpperCase()})` : 'still loading'}
      </h1>
      <h3>{data ? `Sector: ${data.stock.sector}` : 'still loading'}</h3>
    </>
  )

  return (
    <>
      {title}
      <StockTxnCountGraph prices={prices} />
      <TransactionsTable
        symbol={Stock.toLowerCase()}
        stockName={data?.stock.name}
      />
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
  const stockProfile = await loadFinnHubStockProfile(params.Stock)
  return {
    props: { prices: prices, profile: stockProfile },
  }
}
