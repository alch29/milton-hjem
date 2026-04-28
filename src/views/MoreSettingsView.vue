<script setup>
import CardContactInfo from '@/components/cardComponents/CardContactInfo.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import Card from '@/components/cardComponents/Card.vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();


</script>

<template>
  <div class="more-settings-view">
    <RouterLink :to="{ name: 'more' }" class="more-settings-view__breadcrumb">
      <Breadcrumb>Mere</Breadcrumb>
    </RouterLink>
    <h1>Mine indstillinger</h1>
    <p class="breadcrumbs">Min profil</p>
    <CardContactInfo>
      <template #image>
        <img src="../assets/icons/User.svg">
      </template>
      <template #user-name>
        <h3>{{ store.currentUser?.firstName }} {{ store.currentUser?.lastName }}</h3>
      </template>
      <template #contact-info>
        <p>{{ store.currentUser?.phoneNumber }}</p>
        <p>{{ store.currentUser?.email }}</p>
        <p>{{ store.currentUser?.address }}</p>
        <p>{{ store.currentUser?.postalCode }}</p>
      </template>
    </CardContactInfo>
    <p class="breadcrumbs">Notifikationspræferencer</p>
    <Card>
      <template #content>
        <h3>Slå notifikationer til</h3>
      </template>
    </Card>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.more-settings-view {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__breadcrumb {
    text-decoration: none;
  }
}
</style>
