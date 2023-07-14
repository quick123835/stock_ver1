import { Outlet, useNavigate } from 'react-router-dom'
import Navbar1 from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Layout.module.scss'
import { getStockInfo } from '../../api/stock'
import { useStockContext } from '../../contexts/stockContexts'

const Layout = () => {
  const { container } = styles
  const navigate = useNavigate()

  const {
    stocks,
    stockNum,
    setStockNum,
    setStockData,
    setCurrentStock,
    setFilterStocks
  } = useStockContext()

  const handleInputChange = inputValue => {
    setStockNum(inputValue)
    // setFilterStocks(stocks.filter(stock => stock.stock_id.includes(stockNum)))
  }

  const handleBtnClick = async () => {
    console.log(stockNum)
    try {
      const data = await getStockInfo(stockNum)
      setStockData(data)
      setFilterStocks(
        stocks.filter(stock => stock.stock_id.includes(stockNum)),
        setCurrentStock({
          id: stockNum
        })
      )
      console.log('資料取得成功')
      navigate(`/stock/${stockNum}`)
      setStockNum('')
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
