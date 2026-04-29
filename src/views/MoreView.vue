<script setup>
import Card from '@/components/cardComponents/Card.vue';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';

const store = useUserStore();
const router = useRouter();

async function logout() {
  await signOut(auth);
  store.currentUser = null;
  store.selectedUser = null;
  store.consultant = null;
  sessionStorage.removeItem('selectedUserId');
  indexedDB.deleteDatabase('firebaseLocalStorageDb');
  router.push({ name: 'login' });
}
</script>

<template>
  <div class="more-view">
    <h1>Mere</h1>
    <div class="more-view__card-container">
      <RouterLink
        :to="{ name: 'more-settings' }"
        class="more-view__card"
      >
        <Card>
          <template #content>
            <img src="../assets/icons/User.svg">
            <p>Mine indstillinger</p>
          </template>
        </Card>
      </RouterLink>
      <RouterLink
        :to="{ name: 'more-contact' }"
        class="more-view__card"
      >
        <Card>
          <template #content>
            <img src="../assets/icons/Arrow.svg">
            <p>Kontakt</p>
          </template>
        </Card>
      </RouterLink>
      <div
        class="more-view__card"
        @click="logout"
      >
        <Card>
          <template #content>
            <img src="../assets/icons/LogOut.svg">
            <p>Log ud</p>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.more-view {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__card {
    text-decoration: none;
  }
}
</style>
