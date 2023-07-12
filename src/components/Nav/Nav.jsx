import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

function Navbar1 ({ stockNum, onChange, onClick }) {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/stock'>
          <h1>買賣力道基地</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'></Navbar.Collapse>
        <div className='input-group mb-3 w-25 d-flex align-items-center'>
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
