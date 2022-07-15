import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login')
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
        component: () => import(/* webpackChunkName: "login" */ '../views/about')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "login" */ '../views/user')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import(/* webpackChunkName: "login" */ '../views/home')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
