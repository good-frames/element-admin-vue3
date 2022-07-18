import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { ElMessage } from 'element-plus'

import { getToken } from '@/utils/storge'

import { HttpRequest } from '@/types/http'

const service = axios.create({
  baseURL: 'http://127.0.0.1:7001/api',
  timeout: 10000
})

service.interceptors.request.use(
  (config: any) => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }

    config.headers['Access-Control-Allow-Origin'] = '*'

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    console.log(response)
    const responseData = response.data
    if (responseData.success) {
      if (responseData.code !== 2000) {
        return Promise.reject(responseData)
      }

      return Promise.resolve(responseData.data)
    } else {
      console.log('后端提示')
      return Promise.reject(responseData)
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 *
 * @param url 请求地址
 * @param method 请求方式
 * @param data 请求入参
 * @param errorShowMessage 接口没有通过，是否显示通用提示，设置为false可以在业务中单独处理错误处理逻辑
 * @returns
 */
export default function http ({ url, method, data, params, errorShowMessage = true }: HttpRequest) {
  return new Promise((resolve, reject) => {
    service({
      url,
      method,
      params,
      data
    })
      .then(res => {
        resolve(res)
      })
      .catch(res => {
        if (errorShowMessage) {
          // 通用提示
          ElMessage({
            type: 'error',
            message: res.message
          })
        }
        if ([1001, 1002, 1003].includes(res.code)) {
          // 重新登录
          store.commit('user/SET_TOKEN', null)
          store.commit('user/SET_USERINFO', null)
          router.push('/login')
        }
        reject(res)
      })
  })
}
