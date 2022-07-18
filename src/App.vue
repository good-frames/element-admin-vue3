<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <!-- <router-view/> -->
    <router-view v-slot="{ Component }" class="layout-main__view">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </el-config-provider>
</template>

<script>

import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'

export default defineComponent({
  components: {
    ElConfigProvider
  },
  setup () {
    return {
      zIndex: 3000,
      size: 'small'
    }
  }
})
</script>

<style scoped lang="stylus">
// .fade-enter-from
//   transform translateX( -20px)
//   opacity 0

// .fade-enter-to,
// .fade-leave-from
//   transform translateX(0)

// .fade-leave-to
//   transform translateX(20px)
//   opacity 0

// .fade-enter-active,
// .fade-leave-active
//   transition all .3s ease-in-out
</style>
