import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addNewUser } from '../Redux/userList/usersSlice'
import { createUser } from '../services/userService'
const ModalAddNew = (props) => {
  const { isShow, handleClose } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const handleSaveUser = async () => {
    const res = await createUser(email, firstName, lastName)
    if (res && res.data) {
      dispatch(addNewUser(res))
      setEmail('')
      setFirstName('')
      setLastName('')
      handleClose()
      toast.success('A user created success')
    } else {
      toast.error('Error.....')
    }
  }
  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
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
          onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSaveUser()}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAddNew
