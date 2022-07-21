import { RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { getToken } from '@/utils/storge'

const whiteList = [
  '/login'
]

export default function permission (router: any) {
  router.beforeEach(async (to:any, from:any, next:any) => {
    const token = getToken()

    if (token) {
      // 已登录
      if (to.name === 'login') {
        next('/')
      } else {
        const hasRoles = store.getters['user/roles'] && store.getters['user/roles'].length > 0
        if (hasRoles) {
          next()
        } else {
          const roles = await store.dispatch('user/getUserRoles')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log(roles, accessRoutes, store.getters['user/roles'])

          accessRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route)
          })
          // router.replace(to.path)
          next({ ...to, replace: true })
        }
      }
    } else {
      // 没有登录
      if (whiteList.indexOf(to.path) !== -1) {
        // 不需要登录也能去的路由
        next()
      } else {
        // 去登录
        next({
          name: 'login',
          query: {
            redirect: to.path
          }
        })
      }
    }
  })
}
