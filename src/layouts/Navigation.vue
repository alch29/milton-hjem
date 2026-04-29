<script setup>
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const allLinks = [
  { name: 'home',      label: 'Hjem',       icon: 'Home',     consultantOnly: false },
  { name: 'images',    label: 'Billeder',   icon: 'Photo',    consultantOnly: false },
  { name: 'documents', label: 'Dokumenter', icon: 'Document', consultantOnly: false },
  { name: 'upload',    label: 'Upload',     icon: 'Upload',   consultantOnly: true  },
  { name: 'chat',         label: 'Beskeder',   icon: 'Message',  consultantOnly: false, clientName: 'client-chats' },
  { name: 'more',      label: 'Mere',       icon: 'More',     consultantOnly: false }
];

const links = computed(() => {
  return allLinks.filter(link => {
    return !link.consultantOnly || userStore.currentUser?.isConsultant;
  });
}
);
</script>

<template>
  <nav class="navigation">
    <RouterLink
      v-for="link in links"
      :key="link.name"
      :to="{ name: !userStore.currentUser?.isConsultant && link.clientName ? link.clientName : link.name }"
      class="navigation__item"
    >
      <img
        :src="`/src/assets/icons/${link.icon}.svg`"
        :alt="link.label"
        class="navigation__icon"
      >
      <span class="navigation__label">{{ link.label }}</span>
    </RouterLink>
  </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.navigation {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: $mobile-width;
  display: flex;
  background-color: $color-primary;
  border-top: 1px solid $color-primary-light;
  box-sizing: border-box;
  z-index: 10;

  @media (min-width: $breakpoint-desktop) {
    width: $breakpoint-desktop;
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    text-decoration: none;
    color: $color-white;

    &.router-link-active {
      color: $color-cta;

      .navigation__icon {
        filter: brightness(0) saturate(100%) invert(100%) sepia(27%) saturate(4706%) hue-rotate(306deg) brightness(106%) contrast(110%);
      }
    }
  }

  &__icon {
    width: 28px;
    height: 28px;
    margin: 6px 0px;
    // make theb icons white by default
    filter: brightness(0) invert(1);
  }

  &__label {
    font-family: $font-family-base;
    font-size: $bread-mobile-size;
    line-height: $bread-mobile-lh;
    font-weight: $font-weight-regular;
  }
}
</style>
