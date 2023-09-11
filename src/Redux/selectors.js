import { createSelector } from '@reduxjs/toolkit'

export const userListSelector = (state) => state.userList.users
export const searchTextSelector = (state) => state.userList.searchText
export const totalPagesSelector = (state) => state.userList.totalPage
export const currentPageSelector = (state) => state.userList.currentPage
export const userRemainingSelector = createSelector(
  userListSelector,
  currentPageSelector,
  searchTextSelector,
  (userList, currentPage, searchText) => {
    let user = userList.filter((user) => {
      return user.email.includes(searchText)
    })
    const start = (currentPage - 1) * 6
    const end = start + 6
    user = user.slice(start, end)
    console.log('🚀 >>>>> user:', user)
    return user
  }
)
