<script setup>
import { ref } from 'vue'

defineProps({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

const isOpen = ref(false)
</script>

<!-- Wait with this, as this is a client feature -->
<template>
  <div class="accordion" :class="{ 'accordion--open': isOpen }" @click="isOpen = !isOpen">
    <div class="accordion__header">
      <span class="accordion__question">{{ question }}</span>
      <img
        src="@/assets/icons/Arrow.svg"
        alt=""
        class="accordion__arrow"
        :class="{ 'accordion__arrow--open': isOpen }"
      />
    </div>
    <Transition name="accordion">
      <div v-if="isOpen" class="accordion__body">
        <p class="accordion__answer">{{ answer }}</p>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.accordion-enter-active,
.accordion-leave-active {
  transition: opacity 0.25s ease, max-height 0.2s ease;
  max-height: 200px;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}

.accordion {
  background-color: $color-primary-light;
  padding: 16px;
  cursor: pointer;
  width: 75%;
  transition: background-color 0.2s ease;
  border: solid 1px;

  &--open {
    background-color: $color-cta;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  &__question {
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;

    .accordion--open & {
      color: $color-text;
    }
  }

  &__arrow {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    filter: brightness(0) invert(0);
    transition: transform 0.33s ease;
    transform: rotate(90deg);

    &--open {
      transform: rotate(-90deg);
      filter: brightness(0);
    }
  }

  &__body {
    margin-top: 12px;
  }

  &__answer {
    font-family: $font-family-base;
    font-size: $bread-mobile-size;
    line-height: $bread-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
    margin: 0;
  }
}
</style>
