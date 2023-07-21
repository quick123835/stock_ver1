import styles from './StocksList.module.scss'
import { getAllStocks } from '../../api/stock'
import { useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState('loading')

  const navigate = useNavigate()

  const getAllStocksAsync = async () => {
    try {
      const { success, data } = await getAllStocks()
      if (success) {
        setStocks(data.reverse())
        // setFilterStocks(data)
        setLoading('loadingComplete')
        return data
      }
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const handleCardClick = (name, id, category) => {
    setCurrentStock({
      id,
      name,
      category
    })
    setCurrentStatus('stock')
    setFilterStocks(
      stocks.filter(stock => stock.industry_category === category)
    )
    navigate(id)
  }

  useEffect(() => {
    getAllStocksAsync()
  }, [])

  useEffect(() => {
    if (stockNum) {
      setFilterStocks(stocks.filter(stock => stock.stock_id.includes(stockNum)))
    } else if (currentCategory) {
      setFilterStocks(
        stocks.filter(stock => stock.industry_category === currentCategory)
      )
    } else {
      setFilterStocks(stocks)
    }
  }, [stockNum, currentCategory])
  const { container } = styles
  return (
    <>
      {loading === 'loading' && (
        <div className={container}>
          <div>Loading...</div>
        </div>
      )}
      {loading === 'loadingComplete' && (
        <div className={container}>
          <StocksListCard
            stocksList={filterStocks.length !== 0 ? filterStocks : stocks}
            cardOnClick={handleCardClick}
          />
        </div>
      )}
    </>
  )
}

export default StocksList
