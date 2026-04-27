<script setup>
import Header from '@/layouts/Header.vue';
import Navigation from '@/layouts/Navigation.vue';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

const route = useRoute();
const router = useRouter();
const store = useUserStore();

onMounted(() => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      await store.fetchCurrentUser();
      await store.fetchConsultant();
      const selectedUserId = sessionStorage.getItem('selectedUserId');
      if (selectedUserId) {
        await store.fetchSelectedUser(selectedUserId);
      };
    } else {
      router.push({ name: 'login' });
    }
  });
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
