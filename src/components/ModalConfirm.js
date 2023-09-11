import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../Redux/userList/usersSlice'
import { currentPageSelector } from '../Redux/selectors'
import { deleteUser } from '../services/userService'
import { toast } from 'react-toastify'
const ModalConfirm = (props) => {
  const { handleCloseConfirmModal, isShowConfirmModal, dataUserDelete } = props
  const currentPage = useSelector(currentPageSelector)
  const dispatch = useDispatch()
  const handleDeleteUser = async () => {
    const res = await deleteUser(dataUserDelete.id)
    if (res === 'success') {
      handleCloseConfirmModal(true)
      dispatch(fetchUsers(currentPage))
      toast.success('A user deleted success')
    } else {
      toast.error('Error.....')
    }
  }
  return (
    <Modal
      show={isShowConfirmModal}
      onHide={handleCloseConfirmModal}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to delete user with email <b>{dataUserDelete.email}</b>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseConfirmModal}>
          Close
        </Button>
        <Button
          onClick={handleDeleteUser}
          variant="danger">
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalConfirm
