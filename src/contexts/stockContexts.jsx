import { useContext, createContext, useState } from 'react'

export const StockContext = createContext()

export const StockProvider = ({ children }) => {
  const [stockNum, setStockNum] = useState('')
  const [stockData, setStockData] = useState([])
  const [stocks, setStocks] = useState([])
  const [filterStocks, setFilterStocks] = useState([])
  const [currentStock, setCurrentStock] = useState({})
  const [likeStocks, setLikeStocks] = useState([])
  const [stockCategory, setStockCategory] = useState([])
  const [currentCategory, setCurrentCategory] = useState('')
  const [currentStatus, setCurrentStatus] = useState('stockList')
  const value = {
    stockNum,
    setStockNum,
    stockData,
    setStockData,
    stocks,
    setStocks,
    filterStocks,
    setFilterStocks,
    currentStock,
    setCurrentStock,
    likeStocks,
    setLikeStocks,
    stockCategory,
    setStockCategory,
    currentCategory,
    setCurrentCategory,
    currentStatus,
    setCurrentStatus
  }
  return <StockContext.Provider value={value}>{children}</StockContext.Provider>
}

export const useStockContext = () => {
  return useContext(StockContext)
}
