import DataAdd from '@/views/data-manage/DataAdd.vue'
import DataList from '@/views/data-manage/DataList.vue'
import DataRequire from '@/views/data-manage/DataRequire.vue'
import RiverAdd from '@/views/river-manage/RiverAdd.vue'
import RiverList from '@/views/river-manage/RiverList.vue'
import UserAdd from '@/views/user-manage/UserAdd.vue'
import UserList from '@/views/user-manage/UserList.vue'
import Home from '@/views/home/Home.vue'
import Center from '@/views/center/Center.vue'
import NotFound from '@/views/notfound/NotFound.vue'
import Monitor from '@/views/monitor/Monitor.vue'
import AiHandle from '@/views/aihandle/AiHandle.vue'
const routes = [
  {
    path: '/index',
    component: Home
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/monitor',
    component: Monitor
  },
  {
    path: '/aihandle',
    component: AiHandle
  },
  {
    path: '/data-manage/adddata',
    component: DataAdd
  },
  {
    path: '/data-manage/datalist',
    component: DataList
  },
  {
    path: '/data-manage/datarequire',
    component: DataRequire
  },
  {
    path: '/river-manage/addriver',
    component: RiverAdd
  },
  {
    path: '/river-manage/riverlist',
    component: RiverList
  },
  {
    path: '/user-manage/adduser',
    component: UserAdd,
    requireAdmin: true//管理员可以看 普通用户不能看 做一个设置判断
  }
  , {
    path: '/user-manage/userlist',
    component: UserList,
    requireAdmin: true,

  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Notfound',
    component: NotFound
  }
]


export default routes