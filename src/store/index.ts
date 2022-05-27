import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前的登录状态
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  getters: {},
  mutations: {
    setUser (state, payload) {
      // 保存登录信息到user对象
      state.user = JSON.parse(payload)
      // 登录消息持久化
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {},
  modules: {}
})
