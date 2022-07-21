import { computed, defineComponent, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
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

    // onMounted(() => {
    //   console.log('dddd')
    //   setActivedTab(route.path)
    //   addView(route)
    // })

    onUnmounted(() => {
      console.log('tabbar-unmounted')
    })

    watch(
      () => router.currentRoute.value,
      (now, old) => {
        console.log(now, old)
        setActivedTab(now.path)
        addView(now)
      },
      { immediate: true }
    )

    const tabs = computed(() => {
      return tabsRef.value.filter(tab => {
        return tab.meta && !tab.meta.hidden
      })
    })

    // onBeforeRouteUpdate((to) => {
    //   console.log('df')
    //   setActivedTab(to.path)
    //   addView(to)
    // })

    const handleChangeTab = (tab: any) => {
      router.push(tab)
    }

    const handleDeleteTab = async (tab: ViewItem) => {
      const lastTab = await delView(tab)
      router.push(lastTab)
    }

    return () => {
      const tabbars = tabs.value
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
