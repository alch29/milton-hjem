<script setup>
</script>

<template>
  <div 
    class="breadcrumb breadcrumbs"
  >
    <img
      class="breadcrumb__image"
      src="../assets/icons/Arrow.svg"
    >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;
.breadcrumb {
    color: $color-text;
    display: flex;
    align-items: center;
    gap: 8px;

    &__image {
        width: 10px;
        transform: scale(-1);
    }
}
</style>