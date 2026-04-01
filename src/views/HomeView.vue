<script setup>
import ChatInputField from '@/components/chatComponents/ChatInputField.vue'
</script>

<template>
  <ChatInputField @send="(msg) => console.log(msg)" />
</template>