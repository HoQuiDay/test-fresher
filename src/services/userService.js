import axios from './customAxios'

const fetchAllUser = (page) => {
  return axios.get(`/api/users/${page}`)
}
const createUser = (email, firstName, lastName) => {
  return axios.post('/api/users', { email, firstName, lastName })
}
const editUser = (user) => {
  return axios.patch('/api/users', user)
}
export { fetchAllUser, createUser, editUser }
