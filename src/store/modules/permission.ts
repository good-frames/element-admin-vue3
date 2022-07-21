import { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@/router'

function hasPermission (roles: any, route: any) {
  if (route.meta && route.meta.rolecode) {
    return roles.some((role:string) => route.meta.rolecode === role)
  } else {
    return true
  }
}

export function filterAsyncRoutes (routes:Array<RouteRecordRaw>, roles:any) {
  const res: Array<RouteRecordRaw> = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [] // ?左侧菜单路由
}
const mutations = {
  SET_ROUTES: (state:any, routes: Array<any>) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes: async (context: any, roles: Array<string>) => {
    let accessedRoutes
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || []
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    context.commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
