export default function SelectedStockTable({
  selectedStocks,
  symbol,
  handleSelect,
}) {
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
      <th>#</th>
      <th>Transaction Date</th>
      <th>Report Date</th>
      <th>Congress Member</th>
      <th>Stock Symbol</th>
      <th>Buy/Sell</th>
      <th>Amount Range</th>
      <th>Delete</th>
    </tr>
  )

  const tradeRows = selectedStocks?.map((element, index) => {
    return (
      <tr key={`transaction-key-${element._id}`}>
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
        <td>Trash</td>
      </tr>
    )
  })

  const table = (
    <div className="table-div">
      <h1 style={{ marginBottom: '0px' }}>Selected {symbol} Trades</h1>
      <table className="stock-trades-table">
        <tbody>
          {tradesTableHeaders}
          {tradeRows}
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      {selectedStocks === 'success' ? table : <h2>the DATA is loading ...</h2>}
    </>
  )
}
