<script setup>
import TimelinePreview from '@/components/TimelinePreview.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Card from '@/components/cardComponents/Card.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();
onMounted(async () => {
  await store.fetchCurrentUser()
  await store.fetchConsultant()
});
</script>

<template>
  <main class="home-view">
    <RouterLink 
      :to="{ name: 'consultant-projects' }" 
      v-if="store.currentUser?.isConsultant"
      class="home-view__breadcrumb"
    >
      <Breadcrumb>PROJEKTER</Breadcrumb>
    </RouterLink>
    <div class="home-view__meta">
      <h1>Hej {{ store.currentUser?.firstName }}!</h1>
      <h3 v-if="store.currentUser?.isConsultant">
        {{ store.selectedUser?.address }}, {{ store.selectedUser?.postalCode }}
      </h3>
      <h3 v-if="!store.currentUser?.isConsultant">
        {{ store.currentUser?.address }}, {{ store.currentUser?.postalCode }}
      </h3>
    </div>
    <ProgressBar></ProgressBar>
    <Card>
      <template #body>
        <h2>Primær kontaktperson</h2>
        <h3 v-if="store.currentUser?.isConsultant">
          {{ store.selectedUser?.firstName }} {{ store.selectedUser?.lastName }}
        </h3>
        <h3 v-if="store.currentUser?.isConsultant">
          {{ store.selectedUser?.phoneNumber }}
        </h3>
        <h3 v-if="store.currentUser?.isConsultant">
          {{ store.selectedUser?.email }}
        </h3>
        <h3 v-if="!store.currentUser?.isConsultant">
          {{ store.consultant?.firstName }} {{ store.consultant?.lastName }} – Byggerådgiver
        </h3>
        <h3 v-if="!store.currentUser?.isConsultant">
          {{ store.consultant?.phoneNumber }}
        </h3>
        <h3 v-if="!store.currentUser?.isConsultant">
          {{ store.consultant?.email }}
        </h3>
      </template>
    </Card>
    <TimelinePreview />
  </main>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.home-view {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;

  &__breadcrumb {
    text-decoration: none;
  }

  &__meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>