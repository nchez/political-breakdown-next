import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legen,
  Filler,
} from 'chart.js'
import { Bar, Line, Scatter, Bubble, Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legen,
  Filler
)

export default function StockTxnCountGraph({ prices }) {
  const dateToString = (dateObj) => {
    const ogString = dateObj.toString()
    let dateString =
      ogString.slice(5, 7) +
      '/' +
      ogString.slice(8, 10) +
      '/' +
      ogString.slice(0, 4)
    return dateString
  }
  const pricesY = prices.map((e) => e.close)
  const datesX = prices.map((e) => dateToString(e.transactionDate))

  const tradesY = prices.map((e) => e.txnCount)

  const labels = datesX

  const trades = {
    type: 'bar',
    label: 'Trades',
    borderRadius: 30,
    data: tradesY,
    backgroundColor: 'rgba(32,214,155,1)',
    barThickness: 10,
  }
  const pricesDataset = {
    type: 'line',
    label: 'Prices',
    data: pricesY,
    backgroundColor: 'rgba(1,98,255,1)',
  }

  const data = { labels: labels, datasets: [trades, pricesDataset] }

  return (
    <>
      <Chart type={bar} data={data} />
    </>
  )
}
