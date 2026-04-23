<script setup>
defineProps({
  name: { type: String, default: '' },
  avatar: { type: String, default: null },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="chat-user-info-overlay" @click.self="emit('close')">
    <div class="chat-user-info">
      <button class="chat-user-info__close" @click="emit('close')">
        <img src="@/assets/icons/Cross.svg" alt="Luk" />
      </button>

      <div class="chat-user-info__avatar">
        <img v-if="avatar" :src="avatar" :alt="name" />
        <img v-else src="@/assets/icons/User.svg" alt="Placeholder" class="chat-user-info__avatar--placeholder" />
      </div>

      <span class="chat-user-info__name">{{ name }}</span>

      <div class="chat-user-info__details">
        <div class="chat-user-info__row">
          <span>{{ phone }}</span>
        </div>
        <div class="chat-user-info__row">
          <span>{{ email }}</span>
        </div>
        <div class="chat-user-info__row">
          <span>{{ address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.chat-user-info-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.chat-user-info {
  background-color: $color-white;
  border-radius: 16px;
  padding: 24px;
  width: 85%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;

  &__close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;

    img {
      width: 18px;
      height: 18px;
    }
  }

  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    background-color: $color-background;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &--placeholder {
      width: 48px !important;
      height: 48px !important;
      object-fit: contain;
    }
  }

  &__name {
    font-family: $font-family-base;
    font-size: $h3-mobile-size;
    line-height: $h3-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
  }

  &__details {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
  }

  &__row {
    display: flex;
    align-items: center;
    gap: 12px;

    img {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    span {
      font-family: $font-family-base;
      font-size: $body-mobile-size;
      line-height: $body-mobile-lh;
      font-weight: $font-weight-regular;
      color: $color-text;
    }
  }
}
</style>
