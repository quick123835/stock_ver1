import styles from './SidebarCard.module.scss'
import { FixedSizeList as List } from 'react-window'
import { useStockContext } from '../../contexts/stockContexts'
import clsx from 'clsx'

const { categoryTitle, active } = styles

const SidebarCard = ({
  categoryOnClick,
  stockCategory,
  filterStocks,
  stockOnClick
}) => {
  const { currentCategory, currentStatus, currentStock } = useStockContext()
  const renderStocks = filterStocks.map(stock => stock.stock_name)

  // const Row = ({ data, index, style }) => {
  //   const { active } = styles
  //   return (
  //     <div style={style}>
  //       <button
  //         className={clsx(categoryTitle, {
  //           [active]: data[index] === currentCategory
  //         })}
  //         onClick={() => categoryOnClick?.(data[index])}
  //       >
  //         <p>{data[index]}</p>
  //       </button>
  //     </div>
  //   )
  // }
  // const Row1 = ({ data, index, style }) => {
  //   const { active } = styles
  //   return (
  //     <div style={style}>
  //       <button
  //         className={clsx(categoryTitle, {
  //           [active]: data[index] === currentStock.name
  //         })}
  //         onClick={() => stockOnClick?.(data[index])}
  //       >
  //         <p>{data[index]}</p>
  //       </button>
  //     </div>
  //   )
  // }
  return (
    <>
      {currentStatus === 'stockList' && (
        <div>
          {stockCategory.map((item, index) => {
            return (
              <button
                key={index}
                className={clsx(categoryTitle, {
                  [active]: item === currentCategory
                })}
                onClick={() => categoryOnClick?.(item)}
              >
                <p>{item}</p>
              </button>
            )
          })}
        </div>
      )}
      {currentStatus === 'stock' && (
        <div>
          {renderStocks.map((item, index) => {
            return (
              <button
                key={index}
                className={clsx(categoryTitle, {
                  [active]: item === currentCategory
                })}
                onClick={() => stockOnClick?.(item)}
              >
                <p>{item}</p>
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default SidebarCard
