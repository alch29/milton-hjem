<script setup>

</script>

<template>
  <div class="card">
    <div
      v-if="$slots.body"
      class="card__body"
    >
      <slot name="body" />
    </div>
    <div
      v-if="$slots.content"
      class="card__content"
    >
      <slot name="icon-left" />
      <slot name="content" />
    </div>
    <div class="card__meta">
      <slot name="meta" />
    </div>
    <div v-if="$slots['icon-right']">
      <slot name="icon-right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

  .card {
    border: solid 0.5px $color-text;
    padding: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $h3-mobile-size;
    cursor: pointer;

    &__content {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__body {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    :deep(img) {
      width: 20px;
    }

    &--category {
      flex-direction: column;
      padding: 28px;
      width: fit-content;
    }

    &--highlighted {
      background: $color-primary-light;
    }

    &--meeting {
      background: $color-cta;
    }

    &--completed {
      background: $color-primary;
      color: $color-white;
      border: solid 0.5px $color-primary;
    }

    &--greyed-out {
      border: solid 0.5px $color-text-light;
      color: $color-text-light;
    }
  }
</style>