<script setup>
const links = [
  { name: 'home',      label: 'Hjem',       icon: 'Home'     },
  { name: 'images',    label: 'Billeder',   icon: 'Photo'    },
  { name: 'documents', label: 'Dokumenter', icon: 'Document' },
  { name: 'upload',    label: 'Upload',     icon: 'Upload'   },
  { name: 'chat',      label: 'Beskeder',   icon: 'Message'  },
  { name: 'more',      label: 'Mere',       icon: 'More'     },
]
</script>

<template>
  <nav class="navigation">
    <RouterLink
      v-for="link in links"
      :key="link.name"
      :to="{ name: link.name }"
      class="navigation__item"
    >
      <img :src="`/src/assets/icons/${link.icon}.svg`" :alt="link.label" class="navigation__icon" />
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
    width: 22px;
    height: 22px;
    margin-bottom: 4px;
    // make theb icons white by default, and change color when active
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
