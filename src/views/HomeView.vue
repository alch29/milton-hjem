<script setup>
import TimelinePreview from '@/components/TimelinePreview.vue';
import Card from '@/components/cardComponents/Card.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { onMounted } from 'vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();
onMounted(() => store.fetchUser());
</script>

<template>
  <main class="home-view">
    <RouterLink :to="{ name: 'consultant-projects' }" class="home-view__breadcrumb breadcrumbs">
      <img src="../assets/icons/Arrow.svg">PROJEKTER
    </RouterLink>
    <div class="home-view__meta">
      <h1>Hej {{ store.user?.firstName }}!</h1>
      <h3>{{  }}</h3>
    </div>
    <ProgressBar></ProgressBar>
    <Card>
      <template #content>
        <h3>Primær kontaktperson</h3>
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
    color: $color-text;

    & img {
      width: 10px;
      transform: scale(-1);
      margin-right: 8px;
    }
  }
}
</style>