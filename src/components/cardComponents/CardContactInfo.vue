<script setup>
</script>

<template>
  <div class="card-contact-info">
    <div class="card-contact-info__content">
      <slot class="card-contact-info__image" name="image" />
      <div>
        <slot name="user-name" />
        <slot name="user-role" />
      </div>
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

  &__content {
    flex-direction: row;
  }

  &__image {
    border-radius: 50%;
  }
}

</style>
