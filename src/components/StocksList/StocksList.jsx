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
    currentCategory,
    setCurrentStatus
  } = useStockContext()

  const navigate = useNavigate()

  const getAllStocksAsync = async () => {
    try {
      const { success, data } = await getAllStocks()
      if (success) {
        setStocks(data.reverse())
        setFilterStocks(data)
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
    }
  }, [stockNum])
  const { container } = styles
  return (
    <div className={container}>
      <StocksListCard stocksList={filterStocks} cardOnClick={handleCardClick} />
    </div>
  )
}

export default StocksList
