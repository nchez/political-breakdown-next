import { useRouter } from 'next/router'
import { useEffect } from 'react'
import StockTxnCountGraph from '../../components/StockTxnCountGraph'
import { loadStocks, loadSingleStock } from '../../lib/loadStocks'

export default function Stock({ prices, stock }) {
  const router = useRouter()
  const { Stock } = router.query
  return (
    <>
      <h1>Stock Symbol: {stock[0].symbol.toUpperCase()}</h1>
      <StockTxnCountGraph prices={prices} />
      <h3>Length of price array: {prices.length}</h3>
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
  const response = await loadSingleStock(params.Stock)
  return {
    props: { prices: response.price, stock: response.stock },
  }
}
