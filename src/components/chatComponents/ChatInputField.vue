<script setup>
import { ref } from 'vue'

const message = ref('')

const emit = defineEmits(['send'])

function sendMessage() {
  if (!message.value.trim()) return
  emit('send', message.value)
  message.value = ''
}
</script>

<template>
  <div class="chat-input">
    <input
      v-model="message"
      type="text"
      placeholder="Skriv en besked..."
      @keyup.enter="sendMessage"
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.chat-input {
  display: flex;
  gap: 8px;
  padding: 16px;
  background-color: $color-white;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid $color-primary-light;
    border-radius: 4px;
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    color: $color-text;

    &:focus {
      outline: none;
      border-color: $color-primary;
    }
  }

  button {
    padding: 10px 20px;
    background-color: $color-primary;
    color: $color-white;
    border: none;
    border-radius: 4px;
    font-family: $font-family-base;
    cursor: pointer;
  }
}
</style>
