import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
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
import CongressTraders from '../../components/CongressTraders'
import SelectedStockTable from '../../components/SelectedStockTable'

export default function Stock({ prices, profile }) {
  const [selectedStocks, setSelectedStocks] = useState([])
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

  const handleSelect = (event, id) => {
    if (event.target.checked) {
      console.log('checkbox is checked')
    }
  }

  const title = (
    // need to add website, logo, marketcap -- will require flexbox formatting
    <>
      <h1>{data ? `${data.stock.name}` : 'still loading'}</h1>
      <div className="stock-card">
        <div className="stock-logo-div">
          <Image
            src={profile.logo}
            alt={`picture of ${data?.stock.name} logo`}
            width={100}
            height={5}
          />
        </div>
        <div className="stock-info-div">
          <h3>Proper Name: {profile.name}</h3>
          {/* <h3>{data ? `Sector: ${data.stock.sector}` : 'still loading'}</h3> */}
          <h3>Industry: {profile.finnhubIndustry}</h3>
          <h3 style={{ color: 'blue' }}>
            <a href={`${profile.weburl}`}>Company Website</a>
          </h3>
        </div>
      </div>
    </>
  )

  return (
    <>
      {title}
      <div className="chart-div">
        <div className="main-stock-graph-div">
          <StockTxnCountGraph prices={prices} />
        </div>
        <div className="congress-traders-div">
          <CongressTraders symbol={Stock.toLowerCase()} />
        </div>
      </div>
      {/* <SelectedStockTable
        selected={selectedStocks}
        symbol={Stock.toLowerCase()}
        handleSelect={handleSelect}
      /> */}
      <TransactionsTable
        symbol={Stock.toLowerCase()}
        stockName={data?.stock.name}
        handleSelect={handleSelect}
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
    props: {
      prices: prices,
      profile: stockProfile,
    },
  }
}
