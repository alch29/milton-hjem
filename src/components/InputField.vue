<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input-field">
    <img :src="`/src/assets/icons/${icon}.svg`" :alt="placeholder" class="input-field__icon" />
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-field__input"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.input-field {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid $color-primary-light;
  padding: 0 16px;
  margin: 4px 0;
  background-color: $color-white;
  width: 100%;

  &:focus-within {
    border-color: $color-primary;
  }

  &__icon {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  &__input {
    flex: 1;
    padding: 12px 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;

    &::placeholder {
      color: $color-text-light;
    }
  }
}
</style>
