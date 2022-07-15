import { defineComponent } from 'vue'
import { ElButton, ElIcon, ElAvatar } from 'element-plus'
import {
  Fold,
  Expand
} from '@element-plus/icons-vue'

import { useToggle } from '@/use/useToggle'
import { useStates, useMutations } from '@/use/useVuexMap'

import Avatar from './Avatar'

import './index.styl'

export default defineComponent({
  name: 'layout-header',
  setup () {
    const { sideBarCollapse } = useStates('app', ['sideBarCollapse'])
    const { setSideBarCollapse } = useMutations('app', {
      setSideBarCollapse: 'SET_SIDEBAR_COLLAPSE'
    })

    const { state: toggleState, toggle } = useToggle(sideBarCollapse.value)

    // 切换菜单栏展开/收起
    const handleToggleCollapse = () => {
      toggle()
      setSideBarCollapse(toggleState.value)
    }

    return () => {
      return (
        <div class="layout-header">
          <div class="layout-header__left">
            <ElButton text onClick={handleToggleCollapse}>
              <ElIcon size={18}>
                {
                  toggleState.value ? <Expand></Expand> : <Fold></Fold>
                }
              </ElIcon>
            </ElButton>
          </div>
          <div class="layout-header__right">
            <Avatar></Avatar>
          </div>
        </div>
      )
    }
  }
})
