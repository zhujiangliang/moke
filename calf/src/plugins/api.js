import axios from './axios'

const get = (url, data) => {
  return axios({
    url,
    method: 'get',
    params: data
  })
}
const post = (url, data, json) => {
  return axios({
    url,
    method: 'post',
    data,
    json
  })
}
const del = (url, data) => {
  return axios({
    url,
    method: 'delete',
    params: data
  })
}
const put = (url, data, json) => {
  return axios({
    url,
    method: 'put',
    data,
    json
  })
}

export default {
  get,
  post,
  del,
  put
}
