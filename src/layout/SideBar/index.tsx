import { defineComponent, onMounted, Ref, ref } from 'vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { useRouter } from 'vue-router'

import { useStates } from '@/use/useVuexMap'
import { Menus } from '@/types/app'
import { menus } from '@/config/menus'

import SideBarItem from './SideBarItem.vue'

import './sidebar.styl'

const findMenuItem: (menus: Array<Menus>, path: string) => any = (menus, path) => {
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]
    if (menu.path === path) {
      return menu
    }
    if (menu.children) {
      const status = findMenuItem(menu.children, path)
      if (status) {
        return status
      }
    }
  }
  return false
}

export default defineComponent({
  name: 'SideBar',
  setup () {
    const router = useRouter()
    const { sideBarCollapse, activedTab } = useStates('app', ['sideBarCollapse', 'activedTab'])

    const menusRef: Ref<Array<Menus>> = ref(menus)

    // 点击菜单跳转路由
    const handleSelectMenu = async (index: string) => {
      // 后期增加需求在这里修改， 当前只做路由跳转
      if (!index) return
      const tab = findMenuItem(menusRef.value, index)
      router.push(tab.path)
    }

    return () => {
      const menus = menusRef.value

      return (
        <div class={['layout-menus', { collapse: sideBarCollapse.value }]}>
          <div class="layout-menus__logo">logo</div>
          <ElScrollbar style="100%">
            <ElMenu
              text-color="#fff"
              active-text-color="#ffd04b"
              background-color="#535353"
              default-active={activedTab.value}
              collapse-transition={false}
              collapse={sideBarCollapse.value}
              onSelect={handleSelectMenu}
            >
              {
                menus.map(menu => {
                  return <SideBarItem menus={menu}></SideBarItem>
                })
              }
            </ElMenu>
          </ElScrollbar>
        </div>
      )
    }
  }
})
