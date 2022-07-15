<template>
  <div>
    <ElSubMenu v-if="menus.children && menus.children.length > 0" :index="menus.path || menus.name">
      <template #title>
        <ElIcon v-if="menus.icon">
          <component :is="menus.icon"></component>
        </ElIcon>
        <span class="menu-title__text">{{ menus.name }}</span>
      </template>
      <SideBarItem v-for="menu in menus.children" :key="menu.path" :menus="menu"></SideBarItem>
    </ElSubMenu>
      <ElMenuItem v-else :index="menus.path || menus.name">
        <ElIcon>
          <component :is="menus.icon"></component>
        </ElIcon>
        <template #title>
          <span>{{ menus.name }}</span>
        </template>
      </ElMenuItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ElSubMenu, ElMenuItem, ElIcon } from 'element-plus'

import { Menus } from '@/types/app'

export default defineComponent({
  name: 'SideBarItem',
  components: {
    ElSubMenu,
    ElMenuItem,
    ElIcon
  },
  props: {
    menus: {
      type: Object as PropType<Menus>,
      required: true
    }
  }
})
</script>
