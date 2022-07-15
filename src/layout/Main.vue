<template>
  <div class="layout-main">
    <router-view v-slot="{ Component }" class="layout-main__view">
      <transition
        name="fade-transform"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="stylus" scoped>
@import './styles/main.styl'
</style>
