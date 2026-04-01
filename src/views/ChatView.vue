<script setup>
import ChatInputField from '@/components/chatComponents/ChatInputField.vue'
import ChatUser from '@/components/chatComponents/ChatUser.vue'
</script>

<template>
  <ChatUser name="John Doe" avatar="https://randomuser.me/api/portraits/men/1.jpg" @call="() => console.log('Call')" @history="() => console.log('History')" />
  <ChatInputField @send="(msg) => console.log(msg)" />
  <div class="chat-view"></div>
</template>

<style lang="scss" scoped>
</style>
