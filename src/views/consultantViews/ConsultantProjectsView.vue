<script setup>
import { watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useTimelineStore } from '@/stores/timeline';
import Card from '@/components/cardComponents/Card.vue';
import SearchBar from '@/components/SearchBar.vue';

const store = useUserStore();
const timelineStore = useTimelineStore();
const router = useRouter();

watch(() => store.currentUser, (user) => {
  if (user) store.fetchAllClients()
}, { immediate: true })

async function selectClient(userId) {
  timelineStore.items = [];
  await store.fetchSelectedUser(userId)
  router.push({ name: 'home' });
};

</script>

<template>
  <div class="consultant-projects-view">
    <div class="login-view__logo">
      <img src="@/assets/images/milton_huse_logo_transparent.png" alt="Milton huse logo">
    </div>
    <h1>Projekter</h1>
    <SearchBar></SearchBar>
    <div class="consultant-projects-view__projects-container">
      <div
        class="consultant-projects-view__project"
        v-for="user in store.users"
        :key="user.id"
      >
        <div @click="selectClient(user.id)" class="consultant-projects-view__project-card">
          <Card class="card--highlighted">
            <template #content>{{ user.address }}, {{ user.postalCode }}</template>
            <template #icon-right><img src="@/assets/icons/Notification.svg"></template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.consultant-projects-view {
  padding: 78px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  &__projects-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  &__project-card {
    text-decoration: none;
    color: $color-text;
  }
}
</style>