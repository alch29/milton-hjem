<script setup>
import { ref } from 'vue';

const emit = defineEmits(['sort']);

const options = [
  { label: 'Nyeste først', value: 'newest' },
  { label: 'Ældste først', value: 'oldest' },
  { label: 'A - Å', value: 'alphabetical' },
  { label: 'Å - A', value: 'alphabetical-reverse' }
];

const selected = ref(null);
const isOpen = ref(false);

const selectedLabel = ref('Sorter');

function select(option) {
  selected.value = option.value;
  selectedLabel.value = option.label;
  isOpen.value = false;
  emit('sort', option.value);
}
</script>

<template>
  <div class="sort">
    <button
      class="sort__trigger"
      @click="isOpen = !isOpen"
    >
      <span>{{ selectedLabel }}</span>
      <img
        src="@/assets/icons/Arrow.svg"
        alt=""
        class="sort__chevron"
        :class="{ 'sort__chevron--open': isOpen }"
      >
    </button>

    <div
      v-if="isOpen"
      class="sort__dropdown"
    >
      <button
        v-for="option in options"
        :key="option.value"
        class="sort__option"
        :class="{ 'sort__option--active': selected === option.value }"
        @click="select(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.sort {
  position: relative;
  width: 40%;
  padding: 4px;
  margin: 4px 0;

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: transparent;
    border: 1px solid $color-primary-light;
    padding: 16px 12px;
    cursor: pointer;
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
    box-sizing: border-box;
  }

  &__chevron {
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
    transform: rotate(-90deg);

    &--open {
      transform: rotate(90deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: $color-background;
    border: 1px solid $color-primary-light;
    border-top: none;
    display: flex;
    flex-direction: column;
    z-index: 10;
  }

  &__option {
    padding: 12px;
    border: none;
    background: none;
    cursor: pointer;
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
    text-align: left;
    width: 100%;

    &:hover {
      background-color: $color-background;
    }

    &--active {
      color: $color-primary;
    }
  }
}
</style>
