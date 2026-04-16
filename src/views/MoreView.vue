<script setup>
import Card from '@/components/cardComponents/Card.vue';
</script>

<template>
  <div class="more-view">
    <h1>Mere</h1>
    <div class="more-view__card-container">
      <RouterLink :to="{ name: 'more-settings' }" class="more-view__card">
        <Card>
          <template #content>
            <img src="../assets/icons/User.svg">
            <p>Mine indstillinger</p>
          </template>
        </Card>
      </RouterLink>
      <RouterLink :to="{ name: 'more-contact' }" class="more-view__card">
        <Card>
          <template #content>
            <img src="../assets/icons/Arrow.svg">
            <p>Kontakt</p>
          </template>
        </Card>
      </RouterLink>
      <RouterLink :to="{ name: 'login' }" class="more-view__card">
        <Card>
          <template #content>
            <img src="../assets/icons/LogOut.svg">
            <p>Log ud</p>
          </template>
        </Card>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.more-view {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__card {
    text-decoration: none;
  }
}
</style>
