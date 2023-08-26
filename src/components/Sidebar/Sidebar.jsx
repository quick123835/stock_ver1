import styles from './Sidebar.module.scss'
import { useStockContext } from '../../contexts/stockContexts'
import { useEffect } from 'react'
import SidebarCard from '../SidebarCard/SidebarCard'
import { useNavigate } from 'react-router-dom'
import { BsList } from 'react-icons/bs'

const Sidebar = () => {
  const { container, sidebarBtn, mobileSidebar } = styles
  const {
    stocks,
    setStockNum,
    setStockCategory,
    stockCategory,
    filterStocks,
    setCurrentCategory,
    setCurrentStock,
    setCurrentPage
  } = useStockContext()

  const navigate = useNavigate()

  const handleCategoryClick = category => {
    navigate('/stock_ver1')
    setCurrentCategory(category)
    setCurrentPage(1)
    setStockNum('')
  }

  const handleStockClick = data => {
    const stock = stocks.find(s => s.stock_name === data)
    console.log(stock)
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
      <button
        className={`${sidebarBtn} btn btn-secondary`}
        type='button'
        data-bs-toggle='offcanvas'
        data-bs-target='#offcanvasScrolling'
        aria-controls='offcanvasScrolling'
      >
        <BsList />
      </button>

      <div
        className={`${mobileSidebar} offcanvas offcanvas-start`}
        data-bs-scroll='true'
        data-bs-backdrop='false'
        tabIndex='-1'
        id='offcanvasScrolling'
        aria-labelledby='offcanvasScrollingLabel'
      >
        <div className='offcanvas-header'>
          <h5 className='offcanvas-title' id='offcanvasScrollingLabel'>
            類別及股票
          </h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <SidebarCard
            stockCategory={stockCategory}
            filterStocks={filterStocks}
            categoryOnClick={handleCategoryClick}
            stockOnClick={handleStockClick}
          />
        </div>
      </div>
    </>
  )
}

export default Sidebar
