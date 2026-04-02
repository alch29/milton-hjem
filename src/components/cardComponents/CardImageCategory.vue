<script setup>
</script>

<template>
  <div class="card-image-category">
    <div class="card-image-category__content">
      <div>
        <slot name="title"/>
      </div>
      <div>
        <slot name="meta"/>
      </div>
    </div>
    <div class="card-image-category__image">
      <div class="card-image-category__icon">
        <img src="@/assets/icons/Photo.svg">
        <slot name="image-count" />
      </div>
      <slot name="image" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.card-image-category {
  border: solid 0.5px $color-text;
  color: $color-text;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__image {
  width: 92px;
  height: 92px;
  overflow: hidden;
  position: relative;

    :deep(img) {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: $color-text;
      opacity: 0.6;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: $color-white;
    padding: 8px;

    img {
      filter: brightness(0) invert(1);
    }
  }
}
</style>
