import styles from './SidebarCard.module.scss'
import { FixedSizeList as List } from 'react-window'
import { useStockContext } from '../../contexts/stockContexts'
import clsx from 'clsx'

const { categoryTitle } = styles

const SidebarCard = ({ categoryOnClick, stockCategory }) => {
  const { currentCategory } = useStockContext()
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
  return (
    <>
      <List
        height={750}
        itemCount={stockCategory.length}
        itemSize={40}
        width={200}
        itemData={stockCategory}
      >
        {Row}
      </List>
    </>
  )
}

export default SidebarCard
