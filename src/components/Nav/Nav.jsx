import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useStockContext } from '../../contexts/stockContexts'
import styles from './Nav.module.scss'

const { mobileInput } = styles

function Navbar1 ({ onChange, onClick }) {
  const { stockNum } = useStockContext()
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/stock_ver1'>
          <h1>買賣力道基地</h1>
        </Navbar.Brand>
        <div className={`input-group w-25 ${mobileInput}`}>
          <input
            type='text'
            className='form-control'
            placeholder='股票代號'
            aria-label="Recipient's username"
            aria-describedby='button-addon2'
            onChange={e => onChange?.(e.target.value)}
          />
          <button
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon2'
            value={stockNum}
            onClick={() => {
              onClick()
            }}
          >
            查詢
          </button>
        </div>
      </Container>
    </Navbar>
  )
}

export default Navbar1
