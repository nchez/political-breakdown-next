import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
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
  LogarithmicScale,
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
  const pricesY = prices.close
  const datesX = prices.date.map((e) => dateToString(e))
  const sellVolume = prices.sellVolume.map((e) => {
    return e === 0 ? null : e
  })
  const buyVolume = prices.buyVolume.map((e) => {
    return e === 0 ? null : e
  })

  const labels = datesX

  const sellData = {
    type: 'bar',
    label: 'Sells',
    borderRadius: 0,
    data: sellVolume,
    yAxisID: 'yTrades',
    backgroundColor: 'rgba(236, 75, 75, 0.8)',
    barThickness: 'flex',
    skipNull: true,
  }
  const buyData = {
    type: 'bar',
    label: 'Buys',
    data: buyVolume,
    borderRadius: 0,
    yAxisID: 'yTrades',
    backgroundColor: 'rgba(43, 200, 74, 0.8)',
    barThickness: 'flex',
    skipNull: true,
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
        text: `${prices.symbol.toUpperCase()} Stock Price with Daily Buy and Sell Counts`,
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
        stacked: false,
        title: {
          display: true,
          text: '# of Trades',
        },
        type: 'logarithmic',
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
      <div className="stock-page-graph-div">
        <Chart type="line" options={options} data={data} />
      </div>
    </>
  )
}
