<script setup>
import { useRoute } from 'vue-router';
import Header from '@/layouts/Header.vue';
import Navigation from '@/layouts/Navigation.vue';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const store = useUserStore();
onMounted(async () => {
  await store.fetchCurrentUser();
  await store.fetchConsultant();
});
</script>

<template>
  <div class="app">
    <Header v-if="route.name !== 'login' && route.name !== 'consultant-projects'" />
    <RouterView />
    <Navigation v-if="route.name !== 'login' && route.name !== 'consultant-projects'" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.app {
  width: $mobile-width;
  min-height: 100vh;
  margin: 0 auto;
  padding-bottom: $nav-height;

  @media (min-width: $breakpoint-desktop) {
    width: 1440px;
  }
}
</style>
