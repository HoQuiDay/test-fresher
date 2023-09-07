import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../services/userService'
import ReactPaginate from 'react-paginate'

const TableUsers = (props) => {
  const [userList, setUserList] = useState([])
  const [totalUsers, setTotalUser] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    getUsers(1)
  }, [])
  const getUsers = async (page) => {
    let res = await fetchAllUser(page)
    if (res && res.data) {
      setUserList(res.data)
      setTotalUser(res.total)
      setTotalPages(res.total_pages)
    }
  }
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1)
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
                  </tr>
                )
              })
            : null}
        </tbody>
      </Table>
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
