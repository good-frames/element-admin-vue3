import { defineComponent, Ref, ref } from 'vue'
import { ElScrollbar } from 'element-plus'

import { useStates } from '@/use/useVuexMap'

import TabBarItem from './TabBarItem.vue'

import { TabItem } from '@/types/app'

import './index.styl'

export default defineComponent({
  name: 'TabBar',
  setup () {
    const { tabs, activedTab } = useStates('app', ['tabs', 'activedTab'])
    const tabsRef: Ref<Array<TabItem>> = ref(tabs)

    return () => {
      const tabbars = tabsRef.value
      return (
        <div class="layout-tabbar">
          <ElScrollbar style="height: 45px">
            <div class="layout-tabbar__list">
              {
                tabbars.map(tab =>
                  <TabBarItem
                    actived={activedTab.value === tab.path}
                    info={tab}
                  ></TabBarItem>
                )
              }
            </div>
          </ElScrollbar>
          </div>
      )
    }
  }
})
