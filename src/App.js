import { Button, Col, Container, Row } from 'react-bootstrap'
import './App.scss'
import Header from './components/Header'
import TableUsers from './components/TableUsers'
import ModalAddNew from './components/ModalAddNew'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const handleClose = () => {
    setIsShowModalAddNew(false)
  }
  return (
    <div className="app-container">
      <Header />
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <Col>
            {' '}
            <p className="fw-bolder fs-5">List Users:</p>
          </Col>
          <Col>
            <Button
              className="float-end"
              onClick={() => setIsShowModalAddNew(true)}>
              Add New User
            </Button>
          </Col>
        </Row>
        <TableUsers />
      </Container>
      <ModalAddNew
        isShow={isShowModalAddNew}
        handleClose={handleClose}
      />
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
