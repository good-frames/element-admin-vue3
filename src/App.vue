<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <router-view/>
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

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
</style>
