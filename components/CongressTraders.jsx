import { useQueryClient, useQuery } from 'react-query'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { loadSingleStockTraders } from '../lib/loadStocks'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function CongressTraders({ symbol }) {
  const queryClient = useQueryClient()
  const { data, status, error } = useQuery(
    ['loadCongressCounts', symbol],
    async () => {
      const data = await loadSingleStockTraders(symbol)
      return data
    },
    { keepPreviousData: true }
  )
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    scales: {},
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
        text: `Top 10 ${symbol.toUpperCase()} Congress Traders`,
      },
    },
  }
  const countData = data?.counts.map((e) => e.count)
  const labels = data?.counts.map((e) => e._id)
  const barData = {
    labels,
    datasets: [
      {
        label: '# of Trades',
        data: countData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }
  return (
    <>
      {status === 'success' ? (
        <Bar data={barData} options={options} />
      ) : (
        <h1>Data is still loading</h1>
      )}
    </>
  )
}
