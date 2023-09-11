import axios from './customAxios'

const fetchAllUser = () => {
  return axios.get(`/api/users/`)
}
const createUser = (email, firstName, lastName) => {
  return axios.post('/api/users', { email, firstName, lastName })
}
const editUser = (user) => {
  return axios.patch('/api/users', user)
}
const deleteUser = (id) => {
  return axios.delete(`/api/users/${id}`)
}
export { fetchAllUser, createUser, editUser, deleteUser }
