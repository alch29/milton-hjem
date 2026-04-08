<script setup>
import InputField from '@/components/InputField.vue';
</script>

<template>
  <div class="login-view">
    <InputField icon="User" placeholder="Brugernavn" v-model="username" />
    <InputField icon="Access" placeholder="Adgangskode" type="password" v-model="password" />

  </div>
</template>

<style lang="scss" scoped>
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
