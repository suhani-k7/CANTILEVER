import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = async () => {
  const data = await axios.get(baseUrl)
  return data
}


const create = newObject =>{
    return axios.post(baseUrl,newObject)
}


const getOne = async (id) => {
  const data  = await axios.get(`${baseUrl}/${id}`)
  return data
}


const deleteBlog = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}


export default {getAll,create,getOne,deleteBlog}
