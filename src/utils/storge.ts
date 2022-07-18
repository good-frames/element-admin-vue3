function getValue (key: string) {
  return localStorage.getItem(key)
}

function setValue (key: string, value: any) {
  localStorage.setItem(key, value)
}

// 获取token
export function getToken () {
  return getValue('token')
}

// 设置token
export function setToken (token: string|null) {
  setValue('token', token ?? '')
}

// 获取用户信息
export function getUser () {
  const res = getValue('user')
  return res ? JSON.parse(res) : null
}

// 设置用户信息
export function setUser (userInfo: object|null) {
  const res = userInfo ? JSON.stringify(userInfo) : ''
  setValue('user', res)
}
