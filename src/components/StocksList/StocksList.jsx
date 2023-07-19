import styles from './StocksList.module.scss'
import { getAllStocks } from '../../api/stock'
import { useEffect } from 'react'
import { useStockContext } from '../../contexts/stockContexts'
import { useNavigate } from 'react-router-dom'
import StocksListCard from '../StocksListCard/StocksListCard'

const StocksList = () => {
  const {
    stocks,
    setStocks,
    filterStocks,
    setFilterStocks,
    stockNum,
    setCurrentStock,
    setCurrentStatus,
    currentCategory
  } = useStockContext()

  const navigate = useNavigate()

  const getAllStocksAsync = async () => {
    try {
      const { success, data } = await getAllStocks()
      if (success) {
        setStocks(data.reverse())
        setFilterStocks(stocks)
        return data
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const handleCardClick = (name, id) => {
    setCurrentStock({
      id,
      name
    })
    setCurrentStatus('stock')
    navigate(id)
  }

  useEffect(() => {
    getAllStocksAsync()
  }, [])

  useEffect(() => {
    if (stockNum) {
      setFilterStocks(stocks.filter(stock => stock.stock_id.includes(stockNum)))
    } else if (currentCategory) {
      stocks.filter(stock => stock.industry_category === currentCategory)
    } else {
      setFilterStocks(stocks)
    }
  }, [stockNum, navigate])
  const { container } = styles
  return (
    <div className={container}>
      <StocksListCard stocksList={filterStocks} cardOnClick={handleCardClick} />
    </div>
  )
}

export default StocksList
