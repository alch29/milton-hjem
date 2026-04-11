<script setup>
import Timeline from '@/components/Timeline.vue';
</script>

<template>
    <main class="timeline-view">
        <RouterLink :to="{ name: 'home' }" class="timeline-view__breadcrumb">
            <img src="../assets/icons/Arrow.svg">FORSIDE
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
    font-size: $bread-mobile-size;

    & img {
      width: 10px;
      transform: scale(-1);
      margin-right: 8px;
    }
  }
}
</style>