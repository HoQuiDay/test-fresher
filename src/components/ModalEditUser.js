import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateUser } from '../Redux/userList/usersSlice'
import { editUser } from '../services/userService'
const ModalEditUser = (props) => {
  const { isShowEditModal, handleCloseEditModal, dataUserEdit } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const handleSaveUser = async () => {
    const res = await editUser({ id: dataUserEdit.id, email, firstName, lastName })
    if (res) {
      dispatch(updateUser(res))
      handleCloseEditModal(false)
      toast.success('A user edited success')
    } else {
      toast.error('Error....')
    }
  }
  useEffect(() => {
    if (isShowEditModal) {
      setFirstName(dataUserEdit.first_name)
      setLastName(dataUserEdit.last_name)
      setEmail(dataUserEdit.email)
    }
  }, [dataUserEdit, isShowEditModal])
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isShowEditModal}
      onHide={handleCloseEditModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            className="form-control"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            value={firstName}
            className="form-control"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            value={lastName}
            className="form-control"
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseEditModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSaveUser()}>
          Update User
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalEditUser
