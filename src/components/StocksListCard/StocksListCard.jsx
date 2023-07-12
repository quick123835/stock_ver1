import styles from './StocksListCard.module.scss'

const StocksListCard = ({ stocksList, cardOnClick }) => {
  const { listContainer, card, cardInfo, cardName, stockId } = styles
  return (
    <div className={listContainer}>
      {stocksList.map((stock, index) => (
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
      ))}
    </div>
  )
}

export default StocksListCard
