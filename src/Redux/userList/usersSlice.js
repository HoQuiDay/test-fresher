import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllUser } from '../../services/userService'
const usersSlice = createSlice({
  name: 'userList',
  initialState: { status: 'idle', users: [], totalPage: 0, currentPage: 1 },
  reducers: {
    // IMMER
    addNewUser: (state, action) => {
      state.totalPage = action.payload.total_pages
      state.users.push(action.payload.data)
    },
    updateUser: (state, action) => {
      const id = action.payload.id
      const index = state.users.findIndex((user) => user.id === id)
      if (index !== null) state.users[index] = action.payload
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload
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
        state.currentPage = action.payload.page
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

export const fetchUsers = createAsyncThunk('user/fetchUser', async (page) => {
  return await fetchAllUser(page)
})

// export const addNewUsers = createAsyncThunk('user/addNewUser', async (newUser) => {
//   const data = await postCreateUser(newUser.email, newUser.firstName, newUser.lastName)
//   return data
// })
// export const editUsers = createAsyncThunk('user/editUser', async (User) => {
//   const data = await editUser(User)
//   return data
// })
export const { updateCurrentPage, updateUser, addNewUser } = usersSlice.actions
export default usersSlice.reducer
export const userListSelector = (state) => state.userList.users
export const totalPagesSelector = (state) => state.userList.totalPage
