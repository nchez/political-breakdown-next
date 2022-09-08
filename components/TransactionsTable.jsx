import { loadSingleStockTrades } from '../lib/loadStocks'

export default function TransactionsTable({ trades }) {
  const tradesTableHeaders = (
    <tr>
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

  const tradeRows = trades.map((element, index) => {
    count++
    return (
      <tr key={`transaction-idx-${index}-${element.symbol}`}>
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

  return (
    <>
      <table>
        <tbody>
          {tradesTableHeaders}
          {tradeRows}
        </tbody>
      </table>
    </>
  )
}
