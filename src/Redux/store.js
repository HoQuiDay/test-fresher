import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './userList/usersSlice'

const store = configureStore({
  reducer: {
    userList: usersSlice
  }
})

export default store
