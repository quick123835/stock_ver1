import styles from './Sidebar.module.scss'
import { useStockContext } from '../../contexts/stockContexts'
import { useEffect } from 'react'
import SidebarCard from '../SidebarCard/SidebarCard'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const { container } = styles
  const {
    stocks,
    setStockNum,
    setStockCategory,
    stockCategory,
    filterStocks,
    setCurrentCategory,
    setCurrentStock
  } = useStockContext()

  const navigate = useNavigate()

  const handleCategoryClick = category => {
    navigate('/stock_ver1')
    setCurrentCategory(category)
    setStockNum('')
  }

  const handleStockClick = data => {
    const stock = stocks.find(s => s.stock_name === data)
    setCurrentStock({
      id: stock.stock_id,
      name: stock.stock_name,
      category: stock.industry_category
    })
    navigate(`/stock_ver1/${stock.stock_id}`)
  }

  useEffect(() => {
    const categoryData = []
    for (let i = 0; i < stocks.length; i++) {
      const category = stocks[i].industry_category
      if (!categoryData.includes(category)) {
        categoryData.push(category)
      }
    }
    setStockCategory(categoryData)
  }, [stocks])

  return (
    <>
      <div className={container}>
        <SidebarCard
          stockCategory={stockCategory}
          filterStocks={filterStocks}
          categoryOnClick={handleCategoryClick}
          stockOnClick={handleStockClick}
        />
      </div>
    </>
  )
}

export default Sidebar
