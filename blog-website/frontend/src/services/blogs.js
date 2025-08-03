import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const data = await axios.get(baseUrl,config)
  return data
}


const create = newObject =>{
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl,newObject,config)
}


const getOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const data  = await axios.get(`${baseUrl}/${id}`,config)
  return data
}


const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`,config)
}

const editBlog = async (id,newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
}


export default {getAll,create,getOne,deleteBlog, setToken,editBlog}
