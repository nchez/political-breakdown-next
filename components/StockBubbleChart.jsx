import React from 'react'
import {
  Chart as ChartJS,
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
import { Chart, Bubble } from 'react-chartjs-2'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

export default function StockBubbleChart({ prices }) {
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
  const sellArray = prices.map((e, index) => ({
    x: index,
    y: e.close,
    amount: e.sellVolume / 1000,
  }))
  const buyArray = prices.map((e, index) => ({
    x: index,
    y: e.close,
    r: e.buyVolume / 1000,
  }))

  const options = {
    // plugins: {
    //   title: {
    //     display: true,
    //     text: `${prices[0].symbol.toUpperCase()} Stock Price with Daily Buy and Sell Counts`,
    //   },
    // },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  }

  const data = {
    datasets: [
      {
        label: 'Sells',
        data: sellArray,
        backgroundColor: 'rgba(236, 75, 75, 0.6)',
      },
      {
        label: 'Buys',
        data: buyArray,
        backGroundColor: 'rgba(43, 200, 74, 0.6)',
      },
    ],
  }

  return (
    <>
      <Bubble options={options} data={data} />
    </>
  )
}
