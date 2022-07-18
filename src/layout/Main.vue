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
.layout-main
  box-sizing border-box
  width 100%
  height 100%
  padding 10px
  background #eee
  overflow hidden
  &__view
    width 100%

// .fade-transform-enter-from
//   transform translateX( -20px)
//   opacity 0

// .fade-transform-enter-to,
// .fade-transform-leave-from
//   transform translateX(0)

// .fade-transform-leave-to
//   transform translateX(20px)
//   opacity 0

// .fade-transform-enter-active,
// .fade-transform-leave-active
//   transition all .5s ease-in-out
</style>
