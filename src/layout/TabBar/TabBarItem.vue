<template>
  <div :class="['tabbar-item', { actived }]" @click="handleSelectTab">
    <span class="tabbar-item__title">{{ info.name }}</span>
    <ElIcon
      v-if="info.close"
      class="tabbar-item__close"
      @click.stop="handleDelTab"
    >
      <Close />
    </ElIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { useActions } from '@/use/useVuexMap'
import { TabItem } from '@/types/app'
import { useRouter } from 'vue-router'

export default defineComponent({
  props: {
    // 是否选中
    actived: {
      type: Boolean,
      default: false
    },
    // 标签信息
    info: {
      type: Object as PropType<TabItem>,
      required: true
    }
  },
  setup (props) {
    const router = useRouter()
    const { setTab } = useActions('app', ['setTab'])

    // 切换tab标签页
    const handleSelectTab = async () => {
      const path = await setTab({
        type: 'set',
        tab: {
          path: props.info.path,
          name: props.info.name
        }
      })
      router.push(path)
    }

    // 删除tab标签页
    const handleDelTab = async () => {
      const path = await setTab({
        type: 'del',
        tab: {
          path: props.info.path,
          name: props.info.name
        }
      })
      router.push(path)
    }

    return {
      handleSelectTab,
      handleDelTab
    }
  }
})
</script>

<style lang="stylus" scoped>
.tabbar-item
  display flex
  align-items center
  margin 0 4px
  padding 6px 8px
  border-radius 4px 4px 0 0
  background rgb(245,247,250)
  font-size 14px
  color #909399
  cursor pointer
  &.actived
    background #409eff
    color #fff
  &__title
    margin-right 4px
  &__close
    padding 2px
    border-radius 100%
    &:hover
      background rgba(0,0,0,.3)
      color #fff
</style>
