import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import Stock from './components/Stock/Stock'
import Layout from './components/Layout/Layout'
import StocksList from './components/StocksList/StocksList'
import { StockProvider } from './contexts/stockContexts'

import './reset.css'

function App () {
  return (
    <div className='App' path='/stock_ver1'>
      <StockProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/stock_ver1' element={<Layout />}>
              <Route path='/stock_ver1' element={<StocksList />}></Route>
              <Route path='/stock_ver1/:id' element={<Stock />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </StockProvider>
    </div>
  )
}

export default App
