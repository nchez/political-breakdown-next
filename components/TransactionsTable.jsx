import { useQueryClient, useQuery } from 'react-query'
import { loadSingleStockTrades } from '../lib/loadStocks'
import { useState } from 'react'

// isLoading (status === 'loading'), isError (status = 'error'), isSuccess (or status === 'success'), can be isIdle (status = 'idle')

export default function TransactionsTable({ symbol }) {
  const [rows, setRows] = useState(20)
  const [start, setStart] = useState(0)

  const queryClient = useQueryClient()
  const { data, status, error } = useQuery(
    ['loadStockTrades', symbol],
    async () => await loadSingleStockTrades(symbol, start, rows),
    { retryDelay: 500 }, // in ms}
    [start, rows]
  )

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
  const tradesTableHeaders = (
    <tr>
      <th>Selected</th>
      <th>#</th>
      <th>Transaction Date</th>
      <th>Report Date</th>
      <th>Congress Member Name</th>
      <th>Symbol</th>
      <th>Buy/Sell</th>
      <th>Amount Range</th>
    </tr>
  )
  let count = 0

  const tradeRows = data?.trades.map((element) => {
    count++
    return (
      <tr key={`transaction-key-${element._id}`}>
        <td>
          <input
            type="checkbox"
            id={`${element._id}`}
            name={`${element._id}`}
            value={`${element._id}`}
          ></input>
        </td>
        <td>{count}</td>
        <td>{dateToString(element.transactionDate)}</td>
        <td>{dateToString(element.reportDate)}</td>
        <td>{element.representative}</td>
        <td>{element.symbol.toUpperCase()}</td>
        <td>{element.transaction === 'Purchase' ? 'Buy' : 'Sell'}</td>
        <td>{element.range}</td>
      </tr>
    )
  })

  const table = (
    <div className="table-div">
      <table className="stock-trades-table">
        <tbody>
          {tradesTableHeaders}
          {tradeRows}
        </tbody>
      </table>
      <div class="trade-table-pagination">
        <a href="#">&laquo;</a>
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#">4</a>
        <a href="#">5</a>
        <a href="#">6</a>
        <a href="#">&raquo;</a>
      </div>
    </div>
  )

  return <>{status === 'success' ? table : <h2>the DATA is loading ...</h2>}</>
}
