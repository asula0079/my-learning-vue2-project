import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({})

function redirectLogin () {
  store.commit('setUser', null)
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  }).then(r => console.log(r))
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
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
// 控制刷新状态，防止重复刷新
let isRefreshing = false
// 存储刷新Token期间的请求
let waitingRequests: any[] = []
// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, async function (error) {
  if (error.response) {
    // 请求收到响应了，但超过2xx范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        console.log('没有找到授权信息，返回重新登录')
        redirectLogin()
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        isRefreshing = true
        // 刷新命牌
        return refreshToken().then(res => {
          // 刷新失败，返回登录
          if (!res.data.success) {
            throw new Error('刷新Token失败')
          }
          // 刷新成功，更新Token
          store.commit('setUser', res.data.content)
          // 再次执行挂起的请求
          waitingRequests.forEach(cb => cb())
          waitingRequests = []
          // 再次执行当前请求
          return request(error.config)
        }).catch(error => {
          console.log(`刷新命牌出错，返回重新登录：${JSON.stringify(error)}`)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }

      return new Promise(resolve => {
        waitingRequests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限进行此操作，请联系管理员')
    } else if (status === 404) {
      Message.error('请求的资源不存在')
    } else {
      Message.error('服务器错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求发出去了，但没有收到响应，如网络断开，请求超时
    Message.error('请求超时，请刷新重试')
  } else {
    // 设置请求时发生了一些事情，触发了错误
    Message.error(`请求失败: ${error.message}`)
  }
  // 继续抛出
  console.log(error.config)
  return Promise.reject(error)
})

export default request
