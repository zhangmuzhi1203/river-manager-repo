import { createRouter, createWebHashHistory } from 'vue-router'
import RoutesConfig from '@/router/config'
import Login from '@/views/Login.vue'
import MainBox from '@/views/MainBox.vue'
import store from '@/store/index'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导航守卫：每次路由跳转之前执行  to是下一个路由对象 from是当前路由对象
router.beforeEach((to, from, next) => {
  //先判断下个跳转路由名字是不是登陆路由
  if (to.name === 'login') {
    //是则允许跳转下一个路由
    next()
  } else {
    //不是登陆路由 则要判断是否授权
    if (!localStorage.getItem('token')) {
      //若没授权 则重定向到指定路由（登陆路由）
      next({
        path: '/login'
      })
    } else {
      //如果有授权 再判断第一次是否已经配置并添加了所有路由
      if (!store.state.isGetterRouter) {
        //删除所有的嵌套路由
        // mainbox
        router.removeRoute('mainbox')
        //若没有 则先获取所有路由 并添加到mainbox中
        ConfigRouter()
        //添加完路由后 再执行路由跳转
        next({
          path: to.fullPath
        })
      } else {
        next()
      }
    }

  }
})

const ConfigRouter = () => {

  if (!router.hasRoute('mainbox')) {
    router.addRoute({
      path: '/mainbox',
      name: 'mainbox',
      component: MainBox
    })
  }

  RoutesConfig.forEach(item => {
    checkPermission(item) &&
      router.addRoute('mainbox', item)
  })

  //改变isGetterRouter =  true
  //store.commit：这是 Vuex store 实例的方法，用于触发（或提交）一个 mutation 函数。
  store.commit('changeGetterRouter', true)
}


//用于检查权限
const checkPermission = (item) => {//item是形参
  if (item.requireAdmin) {//判断item对象中是否存在requireAdmin属性
    return store.state.userInfo.role === 1//有 比较store中的state 是则返回true
  }
  return true
}
export default router
