<script setup>
</script>

<template>
  <div class="card-contact-info">
    <div class="card-contact-info__content">
      <div class="card-contact-info__image">
          <slot name="image" />
      </div>
      <slot name="user-name" />
      <slot name="user-role" />
    </div>
    <div class="card-contact-info__meta">
      <slot name="contact-info" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.card-contact-info {
  border: solid 0.5px $color-text;
  background: $color-white;
  color: $color-text;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__image {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  overflow: hidden;

    :deep(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>