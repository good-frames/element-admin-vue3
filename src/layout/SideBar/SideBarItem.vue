<template>
  <div v-if="!isHidden(item)">
     <ElMenuItem
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)"
      :index="resolvePath(onlyOneChild.path)"
    >
      <ElIcon>
        <component :is="menuIcon(onlyOneChild)"></component>
      </ElIcon>
      <template #title>
        <span>{{ menuName(onlyOneChild) }}</span>
      </template>
    </ElMenuItem>
    <ElSubMenu v-else :index="item.path">
      <template #title>
        <ElIcon>
          <component :is="menuIcon(item)"></component>
        </ElIcon>
        <span class="menu-title__text">{{ menuName(item) }}</span>
      </template>
      <SideBarItem v-for="menu in item.children" :key="menu.path" :item="menu" :basePath="resolvePath(menu.path)"></SideBarItem>
    </ElSubMenu>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'

import { resolve } from '@/utils'
import { Menus } from '@/types/app'

export default defineComponent({
  name: 'SideBarItem',
  components: {
    ElSubMenu,
    ElMenuItem,
    ElIcon
  },
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const onlyOneChild = ref()

    const resolvePath = (routePath: string) => {
      return resolve(props.basePath, routePath)
    }

    const menuName = (menu: RouteRecordRaw) => {
      return menu?.meta?.title
    }
    const menuIcon = (menu: RouteRecordRaw) => {
      return menu?.meta?.icon
    }
    const hasOneShowingChild = (children = [], parent: RouteRecordRaw) => {
      const showingChildren = children.filter((item: RouteRecordRaw) => {
        if (item && item.meta && item.meta.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          onlyOneChild.value = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    }

    const hasChildren = (menu: RouteRecordRaw) => {
      return menu.children && menu.children.length > 0
    }

    const isHidden = (menu: RouteRecordRaw) => {
      return menu?.meta?.hidden || false
    }

    return {
      resolvePath,
      menuIcon,
      menuName,
      isHidden,
      hasChildren,
      hasOneShowingChild,
      onlyOneChild
    }
  }
})
</script>
