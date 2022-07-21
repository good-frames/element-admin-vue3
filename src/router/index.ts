import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import permission from './permission'

import Layout from '@/layout'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/index',
    meta: {
      hidden: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home'),
        name: 'home',
        meta: { title: '首页', affix: true }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/about'),
        name: 'about',
        meta: { title: '关于', affix: true }
      }
    ]
  },
  {
    path: '/text',
    component: Layout,
    meta: {
      title: '测试'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import(/* webpackChunkName: "login" */ '../views/test'),
        meta: {
          title: 'test'
        }
      },
      {
        path: 'test2',
        name: 'test2',
        component: () => import(/* webpackChunkName: "login" */ '../views/test2'),
        meta: {
          title: 'test2'
        }
      }
    ]
  }
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/test',
  //   name: 'test',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/test'),
  //   meta: {
  //     rolecode: '1',
  //     hidden: true
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
})

permission(router)

export default router
