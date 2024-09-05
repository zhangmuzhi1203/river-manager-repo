import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  //包含应用程序状态对象 数据状态
  state: {
    //是否已经获得并添加了所有路由 初始值是false
    isGetterRouter: false,
    //是否折叠
    isCollapsed: false,
    //用户数据 
    userInfo: {},
    //云服务器数据
    cloudServerInfo: {},
  },
  //包含计算属性对象
  getters: {
  },
  //包含变更状态对象
  mutations: {
    //变更是否添加并配置了路由
    changeGetterRouter (state, value) {
      //这里的state是旧值 value是新值
      //改变数据状态
      state.isGetterRouter = value
    },
    //变更用户数据
    changeUserInfo (state, value) {
      state.userInfo = {
        //展开旧数据的属性和值到一个新的对象中
        ...state.userInfo,
        //将新数据的属性和值展开到一个新的对象中
        ...value
      }
    },
    //变更云服务器数据
    changeCloudServerInfo (state, value) {
      state.cloudServerInfo = {
        //展开旧数据的属性和值到一个新的对象中
        ...state.cloudServerInfo,
        //将新数据的属性和值展开到一个新的对象中
        ...value
      }
    },
    //变更左边菜单栏是否折叠
    changeIsCollapsed (state) {
      state.isCollapsed = !state.isCollapsed
    },
    clearUserInfo (state) {
      state.userInfo = {}
    }
  },
  //包含异步操作对象
  actions: {
  },
  //模块化vue-store选项
  modules: {
  },
  //插件功能
  plugins: [createPersistedState({
    paths: ['userInfo', 'isCollapsed'] //path属性是一个数组 控制是否持久化
  })],
})
