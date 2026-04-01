<script setup>
import { useRoute } from 'vue-router'
import Header from '@/layouts/Header.vue'
import Navigation from '@/layouts/Navigation.vue'

const route = useRoute()
</script>

<template>
  <Header v-if="route.name !== 'login'" />
  <RouterView />
  <Navigation v-if="route.name !== 'login'" />
</template>

<style lang="scss" scoped>
</style>
