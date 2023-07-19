import styles from './Sidebar.module.scss'
import { getAllStocks } from '../../api/stock'
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
    setFilterStocks,
    filterStocks,
    setCurrentCategory
  } = useStockContext()

  const navigate = useNavigate()

  const handleCategoryClick = category => {
    navigate('/stock')
    setFilterStocks(
      stocks.filter(stock => stock.industry_category === category)
    )
    setCurrentCategory(category)

    setStockNum('')
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
    <div className={container}>
      <SidebarCard
        stockCategory={stockCategory}
        filterStocks={filterStocks}
        categoryOnClick={handleCategoryClick}
      />
    </div>
  )
}

export default Sidebar
