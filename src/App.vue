<script setup>
import { useRoute } from 'vue-router'
import Header from '@/layouts/Header.vue'
import Navigation from '@/layouts/Navigation.vue'

const route = useRoute()
</script>

<template>
  <div class="app">
    <Header v-if="route.name !== 'login'" />
    <RouterView />
    <Navigation v-if="route.name !== 'login'" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.app {
  width: $mobile-width;
  min-height: 100vh;
  margin: 0 auto;

  @media (min-width: $breakpoint-desktop) {
    width: 1440px;
  }
}
</style>
