<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue';
import CardContactInfo from '@/components/cardComponents/CardContactInfo.vue';
import { useUserStore } from '../stores/user';

const store = useUserStore();
</script>

<template>
  <div class="more-contact-view">
    <RouterLink :to="{ name: 'more' }" class="more-contact-view__breadcrumb">
      <Breadcrumb>Mere</Breadcrumb>
    </RouterLink>
    <h1>Kontakt</h1>
    <CardContactInfo v-if="store.currentUser?.isConsultant">
      <template #image>
        <img src="../assets/icons/User.svg">
      </template>
      <template #user-name>
        <h3>{{ store.selectedUser?.firstName }} {{ store.selectedUser?.lastName }}</h3>
      </template>
      <template #contact-info>
        <p>{{ store.selectedUser?.phoneNumber }}</p>
        <p>{{ store.selectedUser?.email }}</p>
        <p>{{ store.selectedUser?.address }}</p>
        <p>{{ store.selectedUser?.postalCode }}</p>
      </template>
    </CardContactInfo>
    <CardContactInfo v-if="!store.currentUser?.isConsultant">
      <template #image>
        <img src="../assets/icons/User.svg">
      </template>
      <template #user-name>
        <h3>{{ store.consultant?.firstName }} {{ store.consultant?.lastName }}</h3>
      </template>
      <template #user-role>
        <p>{{ store.consultant?.role }}</p>
      </template>
      <template #contact-info>
        <p>{{ store.consultant?.phoneNumber }}</p>
        <p>{{ store.consultant?.email }}</p>
      </template>
    </CardContactInfo>
    <CardContactInfo>
      <template #image>
        <img src="../assets/images/milton_huse_a_s_logo.jpg">
      </template>
      <template #user-name>
        <h3>Milton Huse</h3>
      </template>
      <template #user-role>
        <p>Administration</p>
      </template>
      <template #contact-info>
        <p>+45 75 62 43 00</p>
        <p>info@miltonhuse.dk</p>
        <p>Huginsvej 2C</p>
        <p>4100 Ringsted</p>
      </template>
    </CardContactInfo>
  </div>
</template>

<style lang="scss" scoped>

.more-contact-view {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__breadcrumb {
    text-decoration: none;
  }
}
</style>
