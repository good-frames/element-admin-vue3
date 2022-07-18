import http from '@/utils/http'

type LoginData = {
  loginName: string // 登录用户名
  password: string // 登录密码
}

// 登录
export function login (data: LoginData) {
  return http({
    url: 'login',
    method: 'post',
    data
  })
}

// 登出
export function logout () {
  return http({
    url: 'logout',
    method: 'get'
  })
}

// 获取登录用户信息
export function getUserInfo () {
  return http({
    url: 'loginUserInfo',
    method: 'get'
  })
}
