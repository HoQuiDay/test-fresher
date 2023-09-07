import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { postCreateUser } from '../services/userService'
import { toast } from 'react-toastify'
const ModalAddNew = (props) => {
  const { isShow, handleClose } = props
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const handleSaveUser = async () => {
    const res = await postCreateUser(name, job)
    if (res && res.id) {
      handleClose()
      setJob('')
      setName('')
      toast.success('A user created success')
    } else {
      toast.error('A error......')
    }
  }
  return (
    <Modal
      show={isShow}
      onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {' '}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Job</label>
          <input
            type="text"
            className="form-control"
            onChange={(event) => setJob(event.target.value)}
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
