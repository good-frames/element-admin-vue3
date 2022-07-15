import { defineComponent, PropType } from 'vue'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'

// import SubMenu from './submenu'
import SideBarItem from './SideBarItem'

import { Menus } from '@/types/app'

export default defineComponent({
  name: 'SideBarItem',
  props: {
    menus: {
      type: Object as PropType<Menus>,
      required: true
    }
  },
  setup (props) {
    return () => {
      if (props.menus.children && props.menus.children.length) {
        return (
          <ElSubMenu
            index={props.menus.path || props.menus.name}
            v-slots={
              { title: () => <span>{props.menus.name}</span> }
            }
          >
            {
              props.menus.children.map(menu => {
                return <SideBarItem menus={menu}></SideBarItem>
              })
            }
          </ElSubMenu>
        )
      } else {
        return (
          <ElMenuItem
            index={props.menus.path}
          >
            <ElIcon>
              {/* {menu.icon} */}
            </ElIcon>
            <span>{ props.menus.name }</span>
          </ElMenuItem>
        )
      }
    }
  }
})
