import React, { useEffect, useState } from 'react'

import Table from 'react-bootstrap/Table'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../Redux/userList/usersSlice'
import { totalPagesSelector, userListSelector } from '../Redux/userList/usersSlice'
import { Button } from 'react-bootstrap'
import ModalEditUser from './ModalEditUser'

const TableUsers = () => {
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})
  const userList = useSelector(userListSelector)
  const totalPages = useSelector(totalPagesSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers(1))
  }, [dispatch])
  const handlePageClick = (event) => {
    dispatch(fetchUsers(+event.selected + 1))
  }
  const handleCloseEdiModal = () => {
    setIsShowEditModal(false)
  }
  const handleEditUser = (user) => {
    setIsShowEditModal(true)
    setDataUserEdit(user)
  }
  return (
    <>
      <Table
        striped
        bordered
        hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList && userList.length
            ? userList.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td className="d-flex justify-content-center align-items-center">
                      <Button
                        className="mx-2"
                        variant="warning"
                        onClick={() => handleEditUser(user)}>
                        Edit
                      </Button>
                      <Button variant="danger">Delete</Button>
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </Table>
      <ModalEditUser
        isShowEditModal={isShowEditModal}
        handleCloseEdiModal={handleCloseEdiModal}
        dataUserEdit={dataUserEdit}
      />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  )
}

TableUsers.propTypes = {}

export default TableUsers
