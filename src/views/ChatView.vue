<script setup>
import ChatInputField from '@/components/chatComponents/ChatInputField.vue'
</script>

<template>
  <ChatInputField @send="(msg) => console.log(msg)" />
  <div class="chat-view"></div>
</template>

<style lang="scss" scoped>
</style>
