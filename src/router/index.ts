import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import permission from './permission'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '../layout'),
    redirect: '/main/home',
    children: [
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "login" */ '../views/about'),
        meta: {
          title: '关于'
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "login" */ '../views/user'),
        meta: {
          title: '用户中心'
        }
      },
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "login" */ '../views/home'),
        meta: {
          title: '首页',
          affix: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

permission(router)

export default router
