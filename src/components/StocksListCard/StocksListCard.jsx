import styles from './StocksListCard.module.scss'
import { FixedSizeGrid as Grid } from 'react-window'

const StocksListCard = ({ stocksList, cardOnClick }) => {
  const { listContainer, card, cardInfo, cardName, stockId } = styles

  const columnCount = 4
  const rowCount = Math.ceil(stocksList.length / columnCount)
  const columnWidth = 200
  const rowHeight = 100
  const GUTTER_SIZE = 50

  const cellRenderer = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex
    if (index >= stocksList.length) {
      return null
    }
    const stock = stocksList[index]
    return (
      <div
        className={`${card} ${styles.cardMargin}`}
        style={{
          ...style,
          left: style.left + GUTTER_SIZE,
          top: style.top + 10,
          width: style.width - 10,
          height: style.height - 10
        }}
        key={index}
        onClick={() => cardOnClick?.(stock.stock_name, stock.stock_id)}
      >
        <div className={cardName}>{stock.stock_name}</div>
        <div className={cardInfo}>
          <span className={stockId}>代號: {stock.stock_id}</span>
        </div>
      </div>
    )
  }
  return (
    <div className={listContainer}>
      {/* {stocksList.map((stock, index) => (
        <div
          className={card}
          key={index}
          onClick={() => cardOnClick?.(stock.stock_name, stock.stock_id)}
        >
          <div className={cardName}>{stock.stock_name}</div>
          <div className={cardInfo}>
            <span className={stockId}>代號: {stock.stock_id}</span>
          </div>
        </div>
      ))} */}
      <Grid
        columnCount={columnCount}
        columnWidth={columnWidth}
        rowCount={rowCount}
        rowHeight={rowHeight}
        width={900} // 計算總寬度，包含間隔
        height={750} // 計算總高度，包含間隔
      >
        {cellRenderer}
      </Grid>
    </div>
  )
}

export default StocksListCard
