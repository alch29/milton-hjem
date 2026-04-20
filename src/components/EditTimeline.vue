<script setup>
import InputField from './InputField.vue';
import Button from './Button.vue';
</script>

<template>
  <div class="edit-timeline">
    <h3>Tilføj ny begivenhed</h3>
    <div>
        <p>Titel:</p>
        <InputField />
    </div>
    <div>
        <p>Kort beskrivelse:</p>
        <InputField />
    </div>
    <div>
        <p>Dato:</p>
        
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

</style>