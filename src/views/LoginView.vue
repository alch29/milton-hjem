<script setup>
import InputField from '@/components/InputField.vue';
import Accordion from '@/components/Accordion.vue';
</script>

<template>
  <div class="login-view">
    <InputField icon="User" placeholder="Brugernavn" v-model="username" />
    <InputField icon="Access" placeholder="Adgangskode" type="password" v-model="password" />
    <Accordion
      question="Hvad er inkluderet i lejen?"
      answer="Vand og varme er inkluderet i den månedlige leje."
/>
    <Accordion
      question="Hvad er inkluderet i lejen?"
      answer="Vand og varme er inkluderet i den månedlige leje."
/>
    <Accordion
      question="Hvad er inkluderet i lejen?"
      answer="Vand og varme er inkluderet i den månedlige leje."
/>


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
