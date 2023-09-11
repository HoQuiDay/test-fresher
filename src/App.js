import { Button, Container, Row } from 'react-bootstrap'
import './App.scss'
import Header from './components/Header'
import TableUsers from './components/TableUsers'
import ModalAddNew from './components/ModalAddNew'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { setupServer } from './FakeApis'
import { useDispatch } from 'react-redux'
import { searchUser } from './Redux/userList/usersSlice'
import { debounce } from 'lodash'
setupServer()
function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const handleClose = () => {
    setIsShowModalAddNew(false)
  }
  const dispatch = useDispatch()
  const handleSearch = debounce((event) => {
    const searchText = event.target.value
    if (searchText) {
      dispatch(searchUser({ searchText }))
    } else {
      dispatch(searchUser({ searchText: '' }))
    }
  }, 1000)
  return (
    <div className="app-container">
      <Header />
      <Container>
        <Row className="d-flex justify-content-between align-items-center">
          <div className="col-6 fs-3 fw-medium">List Users:</div>
          <div className="col-6">
            <Button
              className="float-end"
              onClick={() => setIsShowModalAddNew(true)}>
              Add New User
            </Button>
          </div>
        </Row>

        <div className="my-3 col-4">
          <input
            type="text"
            className="form-control col-4"
            onChange={(event) => handleSearch(event)}
            placeholder="Search user by email........"
          />
        </div>

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
