import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
} from 'chart.js'
import { Bar, Line, Scatter, Bubble, Chart } from 'react-chartjs-2'
import * as React from 'react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController
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
  const datesX = prices.map((e) => dateToString(e.date))
  const sells = prices.map((e) => e.sellCount)
  const buys = prices.map((e) => e.buyCount)

  const tradesY = prices.map((e) => e.txnCount)

  const labels = datesX

  const sellData = {
    type: 'bar',
    label: 'Sells',
    borderRadius: 0,
    data: sells,
    yAxisID: 'yTrades',
    backgroundColor: 'rgba(236, 75, 75, 0.6)',
    barThickness: 10,
  }
  const buyData = {
    type: 'bar',
    label: 'Buys',
    data: buys,
    borderRadius: 0,
    yAxisID: 'yTrades',
    backgroundColor: 'rgba(43, 200, 74, 0.6)',
    barThickness: 10,
  }
  const pricesDataset = {
    type: 'line',
    label: 'Prices',
    data: pricesY,
    yAxisID: 'Prices',
    backgroundColor: 'rgba(1,98,255,1)',
  }

  const options = {
    responsive: true,
    // interaction: {
    //   mode: 'index',
    //   intersect: false,
    // },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart - Multi Axis',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      Prices: {
        type: 'linear',
        position: 'right',
        axis: 'y',
        title: { display: true, text: 'Prices' },
      },
      yTrades: {
        stacked: true,
        title: {
          display: true,
          text: '# of Trades',
        },
        type: 'linear',
        axis: 'y',
        position: 'left',
      },
    },
  }

  const data = {
    labels: labels,
    datasets: [sellData, buyData, pricesDataset],
  }

  return (
    <>
      <Chart type="line" options={options} data={data} />
    </>
  )
}
