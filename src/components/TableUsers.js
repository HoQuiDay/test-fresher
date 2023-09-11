import React, { useEffect, useState } from 'react'

import Table from 'react-bootstrap/Table'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, fetchUsers, sortUser } from '../Redux/userList/usersSlice'
import { totalPagesSelector, userRemainingSelector } from '../Redux/selectors'
import { Button } from 'react-bootstrap'
import ModalEditUser from './ModalEditUser'
import ModalConfirm from './ModalConfirm'
const TableUsers = () => {
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false)
  const [dataUserEdit, setDataUserEdit] = useState({})
  const [dataUserDelete, setDataUserDelete] = useState({})
  // const [sortBy, setSortBy] = useState('')
  // const [fieldSort, setFieldSort] = useState('')
  const userList = useSelector(userRemainingSelector)
  const totalPages = useSelector(totalPagesSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  const handlePageClick = (event) => {
    dispatch(changePage(+event.selected + 1))
  }
  const handleCloseModal = () => {
    setIsShowEditModal(false)
    setIsShowConfirmModal(false)
  }
  const handleEditUser = (user) => {
    setIsShowEditModal(true)
    setDataUserEdit(user)
  }
  const handleDeleteUser = (user) => {
    setIsShowConfirmModal(true)
    setDataUserDelete(user)
  }
  const handleSort = (sort, field) => {
    dispatch(sortUser({ sort, field }))
  }

  return (
    <>
      <Table
        striped
        bordered
        hover>
        <thead>
          <tr>
            <th>
              <span className="d-flex justify-content-between align-items-center">
                ID
                <span>
                  <i
                    role="button"
                    onClick={() => handleSort('asc', 'id')}
                    className="fa-solid fa-arrow-up"></i>
                  <i
                    role="button"
                    onClick={() => handleSort('desc', 'id')}
                    className="fa-solid fa-arrow-up fa-rotate-180"></i>
                </span>
              </span>
            </th>
            <th>Email</th>
            <th>
              <span className="d-flex justify-content-between align-items-center">
                First Name
                <span>
                  <span>
                    <i
                      role="button"
                      onClick={() => handleSort('asc', 'first_name')}
                      className="fa-solid fa-arrow-up"></i>
                    <i
                      role="button"
                      onClick={() => handleSort('desc', 'first_name')}
                      className="fa-solid fa-arrow-up fa-rotate-180"></i>
                  </span>
                </span>
              </span>
            </th>
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
                      <Button
                        onClick={() => handleDeleteUser(user)}
                        variant="danger">
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </Table>
      <ModalEditUser
        isShowEditModal={isShowEditModal}
        handleCloseEditModal={handleCloseModal}
        dataUserEdit={dataUserEdit}
      />
      <ModalConfirm
        dataUserDelete={dataUserDelete}
        isShowConfirmModal={isShowConfirmModal}
        handleCloseConfirmModal={handleCloseModal}
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
