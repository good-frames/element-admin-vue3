import { login, logout, getUserInfo } from '@/api/user'
import { getToken, setToken, getUser, setUser } from '@/utils/storge'
import type { LoginForm } from '@/types/user'

type State = {
  token: string | null
  roles: Array<string>
  userInfo: object | null
}

const state: State = {
  token: getToken(), // ?用户token
  roles: [], // ?用户权限
  userInfo: getUser() // ?用户信息
}

const getters = {
  roles: (state: any) => {
    return state.roles
  }
}

const mutations = {
  // 设置登录状态
  SET_TOKEN: (state: State, token: string|null) => {
    state.token = token
    setToken(token)
  },
  // 设置用户信息
  SET_USERINFO: (state: State, userInfo: object | null) => {
    state.userInfo = userInfo
    setUser(userInfo)
  },
  // 设置用户权限
  SET_ROLES: (state: State, roles: Array<string>) => {
    state.roles = roles
  }
}

const actions = {
  /**
   * 登录
   * @param context
   * @param token 用户token
   */
  login: async (context: any, loginForm: LoginForm) => {
    const res:any = await login({
      loginName: loginForm.loginName,
      password: loginForm.password
    })

    context.commit('SET_TOKEN', res.token)
    await context.dispatch('getUserInfo')
  },

  // 登出
  logout: async (context: any) => {
    await logout()
    context.commit('SET_TOKEN', null)
    context.commit('SET_USERINFO', null)
  },

  // 获取当前登录用户信息
  getUserInfo: async (context: any) => {
    const res:any = await getUserInfo()
    context.commit('SET_USERINFO', res)
  },

  // 获取当前登录用户权限
  getUserRoles: async (context: any) => {
    // const res: any =
    const roles = ['1']
    context.commit('SET_ROLES', roles)

    return roles
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
