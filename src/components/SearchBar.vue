<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const searchQuery = ref('');

function onSearch() {
  emit('search', searchQuery.value);
};

function clear() {
  searchQuery.value = '';
  emit('search', '');
};
</script>

<template>
  <div class="search-bar">
    <img
      src="@/assets/icons/Search.svg"
      alt="Søg"
      class="search-bar__icon"
    >
    <input
      v-model="searchQuery"
      type="text"
      @input="onSearch"
    >
    <button
      v-if="searchQuery"
      class="search-bar__clear"
      @click="clear"
    >
      <img
        src="@/assets/icons/Cross.svg"
        alt="Ryd"
      >
    </button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.search-bar {
  display: flex;
  align-items: center;
  background-color: $color-white;
  border: solid 0.5px $color-text;
  width: 100%;
  border-radius: 20px;
  padding: 0px 12px;
  margin: 4px 0px;

  &__icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    flex-shrink: 0;
  }

  input {
    flex: 1;
    padding: 10px 0;
    border: none;
    background: transparent;
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    color: $color-text;
    outline: none;
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
