<script setup>
import TimelinePreview from '@/components/TimelinePreview.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Card from '@/components/cardComponents/Card.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();
onMounted(() => store.fetchCurrentUser());
onMounted(() => store.fetchSelectedUser());
</script>

<template>
  <main class="home-view">
    <RouterLink :to="{ name: 'consultant-projects' }" class="home-view__breadcrumb">
      <Breadcrumb>PROJEKTER</Breadcrumb>
    </RouterLink>
    <div class="home-view__meta">
      <h1>Hej {{ store.currentUser?.firstName }}!</h1>
      <h3>{{ store.selectedUser?.address }}, {{ store.selectedUser?.postalCode }}</h3>
    </div>
    <ProgressBar></ProgressBar>
    <Card class="card--column">
      <template #body>
        <h3>Primær kontaktperson</h3>
        <p>{{ store.selectedUser?.firstName }} {{ store.selectedUser?.lastName }}</p>
        <p>{{ store.selectedUser?.phoneNumber }}</p>
        <p>{{ store.selectedUser?.email }}</p>
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
}
</style>