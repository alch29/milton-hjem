<script setup>
import { ref } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'cta-primary'
  }
});

const isChosen = ref(false);
</script>

<template>
  <div 
    class="button" 
    :class="[
      `button--${variant}`,
      { 'button--category-chosen': variant === 'category' && isChosen }
    ]"
    @click="variant === 'category' && (isChosen = !isChosen)"
    >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.button {
  cursor: pointer;
  width: fit-content;
  border-radius: 100px;
  
  &--cta-primary {
    background: $color-primary;
    border: solid 1px $color-primary;
    padding: 12px 36px;
    color: $color-white;
    transition: ease 0.2s;

    &:hover {
      border-color: $color-text;
      background: transparent;
      color: $color-text;
    }
  }

  &--cta-secondary {
    border: solid 1px $color-text;
    padding: 12px 36px;
    transition: ease 0.2s;

    &:hover {
      border-color: $color-primary;
      background: $color-primary;
      color: $color-white;
    }
  }

  &--category {
    border: solid 1px $color-text;
    padding: 8px 24px;
    transition: ease 0.2s;
  }

  &--category-chosen {
    background: $color-primary;
    border-color: $color-primary;
    color: $color-white;
  }
}

</style>