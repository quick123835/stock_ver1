import styles from './Stock.module.scss'
import { useEffect, useState } from 'react'
import { getStockInfo } from '../../api/stock'
import { useParams } from 'react-router-dom'
import { useStockContext } from '../../contexts/stockContexts'
import PresureStick from '../PresureStick/PresureStick'

const Stock = () => {
  const { candleContainer } = styles
  const { currentStock } = useStockContext()
  const [stockDetail, setStockDetail] = useState([])
  const [loading, setLoading] = useState('loading')
  const stockName = currentStock.name
  const stockId = useParams().id

  const getStockInfoAsync = async id => {
    try {
      const { success, stockInfo } = await getStockInfo(id)
      if (success) {
        setStockDetail(stockInfo)
        setLoading('loadingComplete')
        return stockInfo
      }
      return stockInfo
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getStockInfoAsync(stockId)
  }, [stockId])

  return (
    <main>
      <div className={candleContainer}>
        {loading === 'loading' && <div>Loading...</div>}
        {loading === 'loadingComplete' && (
          <PresureStick
            stockDetail={stockDetail}
            stockName={stockName}
            stockId={stockId}
          />
        )}
      </div>
    </main>
  )
}

export default Stock
