import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllUser } from '../../services/userService'
import _ from 'lodash'
const usersSlice = createSlice({
  name: 'userList',
  initialState: { status: 'idle', users: [], totalPage: 0, currentPage: 1, searchText: '' },
  reducers: {
    // IMMER
    addNewUser: (state, action) => {
      state.totalPage = action.payload.total_pages
      state.users.push(action.payload.data)
    },
    changePage: (state, action) => {
      state.currentPage = action.payload
    },
    searchUser: (state, action) => {
      state.searchText = action.payload.searchText
    },
    sortUser: (state, action) => {
      const { sort, field } = action.payload
      let cloneUser = state.users.map((user) => {
        return { ...user, id: +user.id }
      })
      cloneUser = _.orderBy(cloneUser, [field], [sort])
      state.users = cloneUser
    },
    updateUser: (state, action) => {
      const id = action.payload.id
      const index = state.users.findIndex((user) => user.id === id)
      if (index !== null) state.users[index] = action.payload
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.users
        state.status = 'idle'
        state.totalPage = action.payload.total_pages
      })
    // .addCase(addNewUsers.fulfilled, (state, action) => {
    //   state.totalPage = action.payload.total_pages
    //   if (state.currentPage === state.totalPage) state.users.push(action.payload.data)
    // })
    // .addCase(editUsers.fulfilled, (state, action) => {
    //   const id = action.payload.id
    //   const userIndex = state.users.findIndex((user) => user.id === id)
    //   state.users[userIndex] = action.payload
    // })
  }
})

export const fetchUsers = createAsyncThunk('user/fetchUser', async () => {
  const data = await fetchAllUser()

  return data
})

// export const addNewUsers = createAsyncThunk('user/addNewUser', async (newUser) => {
//   const data = await postCreateUser(newUser.email, newUser.firstName, newUser.lastName)
//   return data
// })
// export const editUsers = createAsyncThunk('user/editUser', async (User) => {
//   const data = await editUser(User)
//   return data
// })
export const { updateCurrentPage, updateUser, addNewUser, removeUser, sortUser, changePage, searchUser } = usersSlice.actions
export default usersSlice.reducer
