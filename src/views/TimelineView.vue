<script setup>
import Timeline from '@/components/Timeline.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
</script>

<template>
    <main class="timeline-view">
        <RouterLink :to="{ name: 'home' }" class="timeline-view__breadcrumb">
          <Breadcrumb variant="secondary">PROJEKTER</Breadcrumb>
        </RouterLink>
        <Timeline />
    </main>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.timeline-view {
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