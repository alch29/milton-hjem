<script setup>
defineProps({
  name: {
    type: String,
    default: 'Ukendt bruger'
  },
  avatar: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['call', 'history'])
</script>

<template>
  <div class="chat-user">
    <div class="chat-user__avatar">
      <img v-if="avatar" :src="avatar" :alt="name" />
      <img v-else src="@/assets/icons/User.svg" alt="Placeholder" class="chat-user__avatar--placeholder" />
    </div>

    <span class="chat-user__name">{{ name }}</span>

    <div class="chat-user__actions">
      <button class="chat-user__btn" @click="emit('call')" aria-label="Ring op">
        <img src="@/assets/icons/Phone.svg" alt="Ring op" />
      </button>
      <button class="chat-user__btn" @click="emit('history')" aria-label="Søg i chathistorik">
        <img src="@/assets/icons/Search.svg" alt="Historik" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.chat-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background-color: $color-white;

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
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
      width: 24px !important;
      height: 24px !important;
      object-fit: contain;
    }
  }

  &__name {
    flex: 1;
    font-family: $font-family-base;
    font-size: $h3-mobile-size;
    font-weight: 600;
    color: $color-text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;

    &:hover {
      background-color: $color-background;
    }

    img {
      width: 22px;
      height: 22px;
    }
  }
}
</style>
