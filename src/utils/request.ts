import axios from 'axios'
import store from '@/store'

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use(function (config) {
  console.log(config)
  const { user } = store.state
  if (user && user.access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${user.access_token}`
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request
