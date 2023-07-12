import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'

const Candlestick = ({ stockDetail, stockName }) => {
  const [chartOptions, setChartOptions] = useState(null)
  useEffect(() => {
    const stockKLine = stockDetail.map(stock => {
      return [
        new Date(stock.date).getTime(),
        stock.open,
        stock.max,
        stock.min,
        stock.close
      ]
    })
    const volumnData = stockDetail.map(stock => {
      return [new Date(stock.date).getTime(), stock.Trading_Volume]
    })
    const calculateMovingAverage = (data, period) => {
      const maData = []
      for (let i = period - 1; i < data.length; i++) {
        let sum = 0
        for (let j = i - period + 1; j <= i; j++) {
          sum += data[j].close
        }
        const average = Math.round((sum / period) * 100) / 100
        maData.push([new Date(data[i].date).getTime(), average])
      }
      return maData
    }
    const ma5Data = calculateMovingAverage(stockDetail, 5)
    const ma10Data = calculateMovingAverage(stockDetail, 10)
    const ma30Data = calculateMovingAverage(stockDetail, 30)
    // console.log(ma5Data)

    // 定义图表的配置选项
    const options = {
      rangeSelector: {
        selected: 2,
        buttons: [
          {
            type: 'month',
            count: 1,
            text: '1月'
          },
          {
            type: 'month',
            count: 3,
            text: '3月'
          },
          {
            type: 'all',
            text: '全部'
          }
        ]
      },
      title: {
        text: stockName
      },
      chart: {
        height: 600 // 设置整个图表的高度
      },
      yAxis: [
        {
          // 第一个y轴配置，用于K线图
          height: '70%', // 设置K线图所占区域的高度
          title: {
            text: '价格'
          }
        },
        {
          // 第二个y轴配置，用于成交量图
          top: '75%', // 设置成交量图的顶部位置
          height: '25%', // 设置成交量图所占区域的高度
          title: {
            text: '成交量'
          },
          offset: 0 // 将成交量图的顶部与K线图的底部对齐
        }
      ],
      series: [
        {
          type: 'candlestick',
          name: '股票价格',
          data: stockKLine, // 这里填入K线图数据
          yAxis: 0 // 使用第一个y轴来显示K线图
        },
        {
          type: 'column',
          name: '成交量',
          data: volumnData, // 这里填入成交量数据
          yAxis: 1 // 使用第二个y轴来显示成交量图
        },
        {
          type: 'spline',
          name: '5ma',
          data: ma5Data // 这里填入5日移动平均线的数据
        },
        {
          type: 'spline',
          name: '10ma',
          data: ma10Data // 这里填入10日移动平均线的数据
        },
        {
          type: 'spline',
          name: '30ma',
          data: ma30Data // 这里填入10日移动平均线的数据
        }
      ]
    }
    setChartOptions(options)
  }, [stockDetail, stockName])

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        constructorType={'stockChart'}
      />
    </div>
  )
}
export default Candlestick
