<script setup>
</script>

<template>
  <header class="header">
    <img src="@/assets/images/milton-huse.jpg" alt="Milton Huse" class="header__logo" />
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.header {
  width: 100%;
  height: 12vh;
  background-color: $color-primary;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 12px;
  box-sizing: border-box;

  &__logo {
    height: 40px;
    object-fit: contain;
  }
}
</style>
