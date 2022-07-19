import { defineComponent, onMounted, Ref, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { ElScrollbar } from 'element-plus'

import { useActions, useStates } from '@/use/useVuexMap'

import TabBarItem from './TabBarItem.vue'

import type { ViewItem } from '@/types/app'

import './index.styl'

export default defineComponent({
  name: 'TabBar',
  setup () {
    const router = useRouter()
    const route = useRoute()
    const { visitedViews } = useStates('app', ['visitedViews'])
    const { setActivedTab, delView, addView } = useActions('app', ['setActivedTab', 'delView', 'addView'])
    const tabsRef: Ref<Array<ViewItem>> = ref(visitedViews)

    onMounted(() => {
      setActivedTab(route.path)
      addView(route)
    })

    onBeforeRouteUpdate(async (to) => {
      setActivedTab(to.path)
      addView(to)
    })

    const handleChangeTab = (tab: any) => {
      router.push(tab)
    }

    const handleDeleteTab = async (tab: ViewItem) => {
      const lastTab = await delView(tab)
      router.push(lastTab)
    }

    return () => {
      const tabbars = tabsRef.value
      return (
        <div class="layout-tabbar">
          <ElScrollbar style="height: 45px">
            <div class="layout-tabbar__list">
              {
                tabbars.map(tab =>
                  <TabBarItem
                    actived={route.path === tab.path}
                    info={tab}
                    onChange={handleChangeTab}
                    onDelete={handleDeleteTab}
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
