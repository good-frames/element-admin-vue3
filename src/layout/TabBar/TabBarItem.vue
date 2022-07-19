<template>
  <div :class="['tabbar-item', { actived }]" @click="handleSelectTab">
    <span class="tabbar-item__title">{{ info.title }}</span>
    <ElIcon
      v-if="!isAffix(info)"
      class="tabbar-item__close"
      @click.stop="handleDelTab"
    >
      <Close />
    </ElIcon>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import type { ViewItem } from '@/types/app'

export default defineComponent({
  props: {
    // 是否选中
    actived: {
      type: Boolean,
      default: false
    },
    // 标签信息
    info: {
      type: Object as PropType<ViewItem>,
      required: true
    }
  },
  emits: ['change', 'delete'],
  setup (props, { emit }) {
    const isAffix = (tab: ViewItem) => tab.meta && tab.meta.affix

    // 切换tab标签页
    const handleSelectTab = async () => {
      emit('change', props.info)
    }

    // 删除tab标签页
    const handleDelTab = async () => {
      emit('delete', props.info)
    }

    return {
      handleSelectTab,
      handleDelTab,
      isAffix
    }
  }
})
</script>

<style lang="stylus" scoped>
.tabbar-item
  display flex
  align-items center
  box-sizing border-box
  height 30px
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
