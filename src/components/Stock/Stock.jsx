import styles from './Stock.module.scss'
import Candlestick from '../Candlestick/Candlestick'
import { useEffect, useState } from 'react'
import { getStockInfo, getAllStocks } from '../../api/stock'
import { useParams } from 'react-router-dom'
import { useStockContext } from '../../contexts/stockContexts'
import PresureStick from '../PresureStick/PresureStick'

const Stock = () => {
  const { candleContainer } = styles
  const { currentStock, setCurrentStock } = useStockContext()
  const [stockDetail, setStockDetail] = useState([])
  const stockName = currentStock.name
  const stockId = useParams().id

  const getStockInfoAsync = async id => {
    try {
      const { success, stockInfo } = await getStockInfo(id)
      if (success) {
        setStockDetail(stockInfo)
        return stockInfo
      }
      return stockInfo
    } catch (error) {
      console.error(error)
    }
  }

  const getStocksName = async stockId => {
    try {
      const { success, data } = await getAllStocks()
      if (success) {
        const stockCategory = []
        const stockName = data.filter(stock => stock.stock_id === stockId)
        stockName.map(stock => {
          stockCategory.push(stock.industry_category)
        })
        setCurrentStock({
          ...currentStock,
          name: stockName[0].stock_name,
          category: stockCategory.join(', ')
        })
        return data
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStocksName(stockId)
    getStockInfoAsync(stockId)
  }, [stockId])

  return (
    <main>
      <div className={candleContainer}>
        {/* <Candlestick stockDetail={stockDetail} stockName={stockName} /> */}
        <PresureStick
          stockDetail={stockDetail}
          stockName={stockName}
          stockId={stockId}
        />
      </div>
    </main>
  )
}

export default Stock
