<script setup>
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';

const route = useRoute();
const store = useUserStore();
</script>

<template>
  <header class="header">
    <div class="header__container">
      <img src="@/assets/images/milton-huse.jpg" alt="Milton Huse" class="header__logo" />
    </div>
    <RouterLink
      :to="{ name: 'consultant-projects' }"
      class="header__breadcrumb"
      v-if="store.currentUser?.isConsultant && ['images', 'documents', 'upload', 'timeline'].includes(route.name)"
    >
      <img class="header__icon" src="../assets/icons/Arrow.svg">
      <p>{{ store.selectedUser?.address }}, {{ store.selectedUser?.postalCode }}</p>
    </RouterLink>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.header {


  &__container {
    width: 100%;
    height: 120px;
    background-color: $color-primary;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding-bottom: 12px;
    box-sizing: border-box;
  }

  &__logo {
    height: 40px;
    object-fit: contain;
  }

  &__breadcrumb {
    padding: 16px 24px;
    background: $color-primary-light;
    border: solid 0.5px $color-text;
    display: flex;
    gap: 16px;
    text-decoration: none;
  }

  &__icon {
      width: 20px;
      transform: scale(-1);
    }
}
</style>
