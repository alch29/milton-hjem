<script setup>
import { ref } from 'vue'
import ChatUserInfoPartial from '@/components/chatComponents/ChatUserInfoPartial.vue'

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

const emit = defineEmits(['call', 'search'])

const showSearch = ref(false)
const searchQuery = ref('')
const showInfo = ref(false)

function toggleSearch() {
  showSearch.value = !showSearch.value
  if (!showSearch.value) searchQuery.value = ''
}

function onSearch() {
  emit('search', searchQuery.value)
}


</script>

<template>
  <div class="chat-user-wrapper">
    <div class="chat-user">
      <div class="chat-user__avatar" @click="showInfo = true">
        <img v-if="avatar" :src="avatar" :alt="name" />
        <img v-else src="@/assets/icons/User.svg" alt="Placeholder" class="chat-user__avatar--placeholder" />
      </div>

      <span class="chat-user__name" @click="showInfo = true">{{ name }}</span>

      <div class="chat-user__actions">
        <button class="chat-user__btn" @click="emit('call')">
          <img src="@/assets/icons/Phone.svg" alt="Ring op" />
        </button>
        <button class="chat-user__btn" :class="{ 'chat-user__btn--active': showSearch }" @click="toggleSearch">
          <img src="@/assets/icons/Search.svg" alt="Søg" />
        </button>
      </div>
    </div>

    <div v-if="showSearch" class="chat-user-wrapper__search">
      <div class="chat-user-wrapper__search-wrapper">
        <img src="@/assets/icons/Search.svg" alt="Søg" class="chat-user-wrapper__search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          @input="onSearch"
          autofocus
        />
        <button class="chat-user-wrapper__search-clear" v-if="searchQuery" @click="searchQuery = ''; onSearch()">
          <img src="@/assets/icons/Cross.svg" alt="Ryd" />
        </button>
      </div>
    </div>
  </div>

  <ChatUserInfoPartial
  v-if="showInfo"
  :name="name"
  :avatar="avatar"
  phone="+45 12 34 56 78"
  email="john@example.com"
  address="Eksempelgade 1, 8000 Aarhus"
  @close="showInfo = false"
/>

</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.chat-user-wrapper {
  width: 100%;
  background-color: $color-primary-light;
}

.chat-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  height: 128px;
  box-sizing: border-box;

  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    background-color: $color-background;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

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
    flex: 1;
    font-family: $font-family-base;
    font-size: $h3-mobile-size;
    line-height: $h3-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
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

    img {
      width: 22px;
      height: 22px;
    }
  }

}

.chat-user-wrapper {
  &__search {
    padding: 8px 16px 12px;
  }

  &__search-wrapper {
    display: flex;
    align-items: center;
    background-color: $color-white;
    border-radius: 20px;
    padding: 0 12px;

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
  }

  &__search-icon {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    flex-shrink: 0;
  }

  &__search-clear {
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
