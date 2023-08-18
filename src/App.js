import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Stock from './components/Stock/Stock'
import Layout from './components/Layout/Layout'
import StocksList from './components/StocksList/StocksList'
import { StockProvider } from './contexts/stockContexts'

import './reset.css'

function App () {
  return (
    <div className='App' path='/'>
      <StockProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/stock' element={<Layout />}>
              <Route path='/stock' element={<StocksList />}></Route>
              <Route path='/stock/:id' element={<Stock />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </StockProvider>
    </div>
  )
}

export default App
