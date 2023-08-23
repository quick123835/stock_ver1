import styles from './StocksListCard.module.scss'
import { FixedSizeGrid as Grid } from 'react-window'
import { useState } from 'react'

const StocksListCard = ({ stocksList, cardOnClick }) => {
  const { listContainer, card, cardInfo, cardName, stockId } = styles
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 24

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPageData = stocksList.slice(startIndex, endIndex)

  const totalPages = Math.ceil(stocksList.length / itemsPerPage)

  return (
    <>
      <div className={listContainer}>
        {currentPageData.map((item, index) => (
          <div
            className={card}
            key={index}
            onClick={() =>
              cardOnClick?.(
                item.stock_name,
                item.stock_id,
                item.industry_category
              )
            }
          >
            <div className={cardName}>{item.stock_name}</div>
            <div className={cardInfo}>
              <span className={stockId}>代號: {item.stock_id}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default StocksListCard
