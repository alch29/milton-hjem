<script setup>
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';

</script>

<template>
  <div class="login-view">
    <div class="login-view__logo">
      <img src="../assets/images/milton_huse_logo_transparent.png">
    </div>
    <h1>Log ind</h1>
    <p>Velkommen til MiltonHjem</p>
    <InputField icon="User" placeholder="Brugernavn" v-model="username" />
    <InputField icon="Access" placeholder="Adgangskode" type="password" v-model="password" />
    <div class="login-view__checkbox">
      <input type="checkbox" name="rememberMe">
      <label for="rememberMe">Husk mig</label>
    </div>
    <Button>Log ind</Button>
    <RouterLink class="login-view__link">Glemt adgangskode?</RouterLink>
    <div class="login-view__sign-up">
      <p>Ikke oprettet endnu?</p>
      <RouterLink class="login-view__link">Bliv oprettet her</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;
.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  height: 100vh;
  padding: 78px;

  &__logo {
    margin-bottom: 32px;
  }

  &__checkbox {
    display: flex;
    align-self: flex-start;
    gap: 8px;

    & input {
      width: 16px;
    }
  }

  &__link, &__sign-up p {
    color: $color-text-light;
  }

  &__sign-up {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>