import styles from './SidebarCard.module.scss'
import { useStockContext } from '../../contexts/stockContexts'

const { categoryTitle } = styles

const SidebarCard = ({ category, categoryOnClick, stock, stockOnClick }) => {
  const { currentStatus } = useStockContext()
  return (
    <>
      {currentStatus === 'stockList' && (
        <button
          className={categoryTitle}
          onClick={() => categoryOnClick?.(category)}
        >
          <p>{category}</p>
        </button>
      )}
      {currentStatus === 'stock' && (
        <button
          className={categoryTitle}
          onClick={() => stockOnClick?.(stock.stock_id)}
        >
          <p>{stock.stock_name}</p>
        </button>
      )}
    </>
  )
}

export default SidebarCard
