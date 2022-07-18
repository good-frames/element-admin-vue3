import { TabItem } from '@/types/app'

import { getToken, setToken } from '@/utils/storge'

type TabAction = 'set' | 'del'

type State = {
  sideBarCollapse: boolean
  activedTab: string
  tabs: Array<TabItem>
}

const state: State = {
  sideBarCollapse: false, // ?菜单展开收起状态， false: 展开状态，true：收起状态
  activedTab: '', // ?当前激活标签页path
  tabs: [] // ?tabs标签菜单页
}

const mutations = {
  // 设置官网后台管理菜单展开收起状态
  SET_SIDEBAR_COLLAPSE: (state: State, sideBarCollapse: boolean) => {
    state.sideBarCollapse = sideBarCollapse
  },
  // 添加添加标签页
  ADD_TABS: (state: State, tab: TabItem) => {
    state.tabs.push(tab)
  },
  // 删除添加标签页
  DEL_TABS: (state: State, index: number) => {
    state.tabs.splice(index, 1)
  },
  // 设置当前激活标签页
  SET_ACTIVED_TAB: (state: State, path: string) => {
    state.activedTab = path
  }
}

const actions = {
  /**
   * 修改当前激活tab菜单页
   * @param context
   * @params param1 {type, tab}
   * @param {TabItem} tab tab菜单项
   * @param {String} type 操作类型 set: 设置当前激活标签页， del: 删除标签页
   * @returns
   */
  setTab: (context: any, { tab, type }:{tab: TabItem, type: TabAction}) => {
    const index = state.tabs.findIndex((t: TabItem) => t.path === tab.path)
    let path = context.state.activedTab
    if (type === 'set') {
      if (index === -1) {
        // 加入新的标签页
        context.commit('ADD_TABS', tab)
      }
      // 设置当前激活标签页
      path = tab.path
    } else {
      if (index !== -1) {
        // 删除当前激活标签页
        context.commit('DEL_TABS', index)
      }
      // 设置当前激活标签页
      if (context.state.tabs.length && path === tab.path) {
        path = state.tabs[context.state.tabs.length - 1].path
      }
    }
    context.commit('SET_ACTIVED_TAB', path)
    return path
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
