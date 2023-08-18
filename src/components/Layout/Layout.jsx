import { Outlet, useNavigate } from 'react-router-dom'
import Navbar1 from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Layout.module.scss'
import { useStockContext } from '../../contexts/stockContexts'

const Layout = () => {
  const { container } = styles
  const navigate = useNavigate()

  const {
    stocks,
    stockNum,
    currentStock,
    setStockNum,
    setCurrentStock,
    setCurrentStatus,
    setFilterStocks
  } = useStockContext()

  const handleInputChange = inputValue => {
    setStockNum(inputValue)
  }

  const handleBtnClick = async () => {
    try {
      const stockInfo = stocks.find(s => s.stock_id === stockNum)
      setCurrentStock({
        name: stockInfo.stock_name,
        id: stockInfo.stock_id,
        category: stockInfo.industry_category
      })
      setCurrentStatus('stock')
      setFilterStocks(
        stocks.filter(s => s.industry_category === stockInfo.industry_category)
      )
      setStockNum('')
      navigate(`/stock_ver1/${stockInfo.stock_id}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Navbar1
        stockNum={stockNum}
        onChange={handleInputChange}
        onClick={handleBtnClick}
      />
      <div className={container}>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
