import { getToken } from '@/utils/storge'

const whiteList = [
  '/login'
]

export default function permission (router:any) {
  router.beforeEach(async (to:any, from:any, next:any) => {
    const token = getToken()

    if (token) {
      // 已登录
      if (to.name === 'login') {
        next({ name: 'main' })
      } else {
        next()
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
