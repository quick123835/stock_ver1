import styles from './SidebarCard.module.scss'
import { FixedSizeList as List } from 'react-window'
import { useStockContext } from '../../contexts/stockContexts'
import clsx from 'clsx'

const { categoryTitle } = styles

const SidebarCard = ({
  categoryOnClick,
  stockCategory,
  filterStocks,
  stockOnClick
}) => {
  const { currentCategory, currentStatus, currentStock } = useStockContext()
  const renderStocks = filterStocks.map(stock => stock.stock_name)
  const Row = ({ data, index, style }) => {
    const { active } = styles
    return (
      <div style={style}>
        <button
          className={clsx(categoryTitle, {
            [active]: data[index] === currentCategory
          })}
          onClick={() => categoryOnClick?.(data[index])}
        >
          <p>{data[index]}</p>
        </button>
      </div>
    )
  }
  const Row1 = ({ data, index, style }) => {
    const { active } = styles
    return (
      <div style={style}>
        <button
          className={clsx(categoryTitle, {
            [active]: data[index] === currentStock.name
          })}
          onClick={() => stockOnClick?.(data[index])}
        >
          <p>{data[index]}</p>
        </button>
      </div>
    )
  }
  return (
    <>
      {currentStatus === 'stockList' && (
        <List
          height={750}
          itemCount={stockCategory.length}
          itemSize={40}
          width={200}
          itemData={stockCategory}
        >
          {Row}
        </List>
      )}
      {currentStatus === 'stock' && (
        <List
          height={750}
          itemCount={renderStocks.length}
          itemSize={40}
          width={200}
          itemData={renderStocks}
        >
          {Row1}
        </List>
      )}
    </>
  )
}

export default SidebarCard
