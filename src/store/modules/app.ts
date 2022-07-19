import type { ViewItem } from '@/types/app'

import { getToken, setToken } from '@/utils/storge'

type State = {
  sideBarCollapse: boolean
  activedTab: string
  visitedViews: Array<ViewItem>
}

const state: State = {
  sideBarCollapse: false, // ?菜单展开收起状态， false: 展开状态，true：收起状态
  activedTab: '', // ?当前激活标签页path

  visitedViews: []
}

const mutations = {
  // 设置官网后台管理菜单展开收起状态
  SET_SIDEBAR_COLLAPSE: (state: State, sideBarCollapse: boolean) => {
    state.sideBarCollapse = sideBarCollapse
  },
  // 添加标签页
  ADD_VISITED_VIEW: (state: State, view: ViewItem) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push({
      path: view.path,
      name: view.name,
      meta: view.meta,
      query: view.query,
      params: view.params,
      title: view.meta?.title || 'no-name'
    })
  },
  // 删除标签页
  DEL_VISITED_VIEW: (state: State, view: ViewItem) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },

  // 设置当前激活标签页
  SET_ACTIVED_TAB: (state: State, path: string) => {
    state.activedTab = path
  }
}

const actions = {
  // 添加tab标签页
  addView: (context: any, view: ViewItem) => {
    context.dispatch('addVisitedView', view)
  },
  addVisitedView (context: any, view: ViewItem) {
    context.commit('ADD_VISITED_VIEW', view)
  },

  // 删除tab标签页
  async delView (context: any, view: ViewItem) {
    const lastView = await context.dispatch('delVisitedView', view)
    return lastView
  },
  delVisitedView (context: any, view: ViewItem) {
    context.commit('DEL_VISITED_VIEW', view)
    const views = context.state.visitedViews
    if (views.length) {
      return views[views.length - 1]
    }
  },

  // 设置当前激活tab标签页
  setActivedTab (context: any, path: string) {
    context.commit('SET_ACTIVED_TAB', path)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
