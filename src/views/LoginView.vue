<script setup>
import { ref } from 'vue';
import InputField from '@/components/InputField.vue';
import Button from '@/components/Button.vue';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const store = useUserStore();

async function login() {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    await store.fetchCurrentUser();

    if (store.currentUser?.isConsultant) {
      router.push({ name: 'consultant-projects' });
    } else {
      router.push({ name: 'home' });
    };
  } catch (error) {
    errorMessage.value = 'Forkert email eller password';
    console.error(error);
  };
};

</script>

<template>
  <div class="login-view">
    <div class="login-view__logo">
      <img src="../assets/images/milton_huse_logo_transparent.png">
    </div>
    <h1>Log ind</h1>
    <p>Velkommen til MiltonHjem</p>
    <InputField
      v-model="email"
      placeholder="Brugernavn"
    >
      <template #icon>
        <img src="../assets/icons/User.svg">
      </template>
    </InputField>
    <InputField
      v-model="password"
      placeholder="Adgangskode"
      type="password"
    >
      <template #icon>
        <img src="../assets/icons/Access.svg">
      </template>
    </InputField>
    <div class="login-view__checkbox">
      <input
        type="checkbox"
        name="rememberMe"
      >
      <label for="rememberMe">Husk mig</label>
    </div>
    <Button @click="login">
      Log ind
    </Button>
    <RouterLink class="login-view__link">
      Glemt adgangskode?
    </RouterLink>
    <div class="login-view__sign-up">
      <p>Ikke oprettet endnu?</p>
      <RouterLink class="login-view__link">
        Bliv oprettet her
      </RouterLink>
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
    
    & img {
      width: 130px;
    }
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