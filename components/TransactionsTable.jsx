import { useQueryClient, useQuery } from 'react-query'
import { loadSingleStockTrades } from '../lib/loadStocks'
import { useEffect, useState, useRef } from 'react'

// isLoading (status === 'loading'), isError (status = 'error'), isSuccess (or status === 'success'), can be isIdle (status = 'idle')

export default function TransactionsTable({ symbol, stockName }) {
  const [rows, setRows] = useState(10)
  const [start, setStart] = useState(0)
  const [startingPage, setStartingPage] = useState(1)
  const [page, setPage] = useState(1)
  const [tableIndex, setTableIndex] = useState(0)
  const [isPrevData, setIsPrevData] = useState(false)

  useEffect(() => {
    if (!isPreviousData) {
      setTableIndex(start)
    }
  }, [isPrevData])

  const queryClient = useQueryClient()
  const { data, status, error, isPreviousData } = useQuery(
    ['loadStockTrades', symbol, start, rows],
    async () => {
      const data = await loadSingleStockTrades(symbol, start, rows)
      setIsPrevData(isPreviousData)
      return data
    },
    { keepPreviousData: true }
    // in ms}
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

  const handlePreviousPage = () => {
    if (startingPage !== 1) {
      setStartingPage(startingPage - 6)
      setPage(startingPage - 6)
      setStart((startingPage - 6 - 1) * rows)
      setIsPrevData(isPreviousData)
    }
  }
  const handleNextPage = () => {
    setStartingPage(startingPage + 6)
    setPage(startingPage + 6)
    setStart((startingPage + 6 - 1) * rows)
    setIsPrevData(isPreviousData)
  }

  const toggleActive = (clickedPage) => {
    if (clickedPage === page) {
      return
    } else {
      setPage(clickedPage)
      setStart((clickedPage - 1) * rows)
      setIsPrevData(isPreviousData)
    }
  }
  const tradesTableHeaders = (
    <tr>
      <th>Selected</th>
      <th>#</th>
      <th>Transaction Date</th>
      <th>Report Date</th>
      <th>Congress Member</th>
      <th>Stock Symbol</th>
      <th>Buy/Sell</th>
      <th>Amount Range</th>
    </tr>
  )

  const tradeRows = data?.trades.map((element, index) => {
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
        <td>
          {/* need to fix this */}
          {tableIndex + index + 1}
        </td>
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
      <h1 style={{ marginBottom: '0px' }}>{stockName} Trades</h1>
      <table className="stock-trades-table">
        <tbody>
          {tradesTableHeaders}
          {tradeRows}
        </tbody>
      </table>
      <div className="trade-table-pagination">
        <div onClick={handlePreviousPage}>&laquo;</div>
        <div
          className={page === startingPage ? 'active' : ''}
          onClick={() => toggleActive(startingPage)}
        >
          {startingPage}
        </div>
        <div
          className={page === startingPage + 1 ? 'active' : ''}
          onClick={() => toggleActive(startingPage + 1)}
        >
          {startingPage + 1}
        </div>
        <div
          className={page === startingPage + 2 ? 'active' : ''}
          onClick={() => toggleActive(startingPage + 2)}
        >
          {startingPage + 2}
        </div>
        <div
          className={page === startingPage + 3 ? 'active' : ''}
          onClick={() => toggleActive(startingPage + 3)}
        >
          {startingPage + 3}
        </div>
        <div
          className={page === startingPage + 4 ? 'active' : ''}
          onClick={() => toggleActive(startingPage + 4)}
        >
          {startingPage + 4}
        </div>
        <div
          className={page === startingPage + 5 ? 'active' : ''}
          onClick={() => toggleActive(startingPage + 5)}
        >
          {startingPage + 5}
        </div>
        <div onClick={handleNextPage}>&raquo;</div>
      </div>
    </div>
  )

  return <>{status === 'success' ? table : <h2>the DATA is loading ...</h2>}</>
}
