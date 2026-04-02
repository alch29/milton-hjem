<script setup>
defineProps({
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    default: ''
  },
  isSent: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="chat-message" :class="{ 'chat-message--sent': isSent, 'chat-message--received': !isSent }">
    <div class="chat-message__bubble">
      <p class="chat-message__text">{{ text }}</p>
      <span class="chat-message__timestamp">{{ timestamp }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.chat-message {
  display: flex;
  padding: 4px 16px;

  &--sent {
    justify-content: flex-end;

    .chat-message__bubble {
      background-color: $color-white;
      border-radius: 18px 18px 4px 18px;
    }
  }

  &--received {
    justify-content: flex-start;

    .chat-message__bubble {
      background-color: $color-cta;
      border-radius: 18px 18px 18px 4px;
    }
  }

  &__bubble {
    max-width: 75%;
    padding: 10px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__text {
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
    margin: 0;
    word-break: break-word;
  }

  &__timestamp {
    font-family: $font-family-base;
    font-size: $bread-mobile-size;
    line-height: $bread-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text-light;
    align-self: flex-end;
  }
}
</style>
