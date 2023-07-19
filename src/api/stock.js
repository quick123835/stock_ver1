import axios from 'axios'

// const cors = 'https://cors-anywhere.herokuapp.com/' // use cors-anywhere to fetch api data
const baseURL = 'https://api.finmindtrade.com/api/v4/data'

const date = new Date()
const year = date.getFullYear() // 取得年份，例如 2023
const month = date.getMonth() + 1 // 取得月份（從0開始，需要加1），例如 6
const day = date.getDate() // 取得日期，例如 23
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day
  .toString()
  .padStart(2, '0')}` //padStart確保月份和日期為兩位數

const lastYearDate = `${year - 1}-${month.toString().padStart(2, '0')}-${day
  .toString()
  .padStart(2, '0')}`

export const getStockInfo = async id => {
  try {
    const { data } = await axios.get(
      `${baseURL}?dataset=TaiwanStockPrice&data_id=${id}&start_date=${lastYearDate}&end_date=${formattedDate}`
      // `${cors}${baseURL}?dataset=TaiwanStockPrice&data_id=${id}&start_date=${lastYearDate}&end_date=${formattedDate}`
    )
    const { msg } = data
    const stockInfo = data.data
    if (msg === 'success') {
      return { success: true, stockInfo }
    }
    return data
  } catch (error) {
    console.error('[getStockInfo failed]', error)
  }
}

export const getAllStocks = async () => {
  try {
    const { data } = await axios.get(`${baseURL}/?dataset=TaiwanStockInfo`)
    // const { data } = await axios.get(
    //   `${cors}${baseURL}/?dataset=TaiwanStockInfo`
    // )
    if (data) {
      return { success: true, ...data }
    }
    console.log(data)
  } catch (error) {
    console.error('[getAllStocks failed]', error)
  }
}
