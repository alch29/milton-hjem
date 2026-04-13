<script setup>
</script>

<template>
  <div class="card-notifications">
    <h3 class="card-notifications__title">Notifikationer</h3>
    <div class="card-notifications__notification">
      <p class="card-notifications__notification-title">title</p>
      <p class="card-notifications__notification-content breadcrumbs">content</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;
.card-notifications {
  border-radius: 10px 0 10px 10px;
  border: solid 0.5px $color-text;
  background: $color-cta;
  padding: 20px;

  &__title {
  border-bottom: solid 1px $color-text;
  padding-bottom: 10px;
  }

  &__notification {
    padding: 10px 0 10px 0;
    border-bottom: solid 1px $color-text;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__notification-title {
    text-transform: uppercase; 
  }
}
</style>