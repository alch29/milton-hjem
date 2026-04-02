<script setup>
import { ref, watch, nextTick } from 'vue'
import ChatInputField from '@/components/chatComponents/ChatInputField.vue'
import ChatUser from '@/components/chatComponents/ChatUser.vue'
import ChatMessage from '@/components/chatComponents/ChatMessage.vue'

const messages = ref([
  { id: 1, text: 'Hej! Hvordan går det', timestamp: '14:00', isSent: false },
  { id: 2, text: 'Det går godt, hvad med', timestamp: '14:01', isSent: true },
  { id: 2, text: 'Dillerman', timestamp: '14:01', isSent: false },
])

// Scroll to bottom when messages change
const messagesContainer = ref()
watch(messages, async () => {
  await nextTick()
  messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
}, { deep: true })

</script>

<template>
  <div class="chat-view">
    <ChatUser name="John Doe" avatar="https://randomuser.me/api/portraits/men/1.jpg" @call="() => console.log('Call')" />

    <div class="chat-view__messages" ref="messagesContainer">
      <ChatMessage
        v-for="msg in messages"
        :key="msg.id"
        :text="msg.text"
        :timestamp="msg.timestamp"
        :isSent="msg.isSent"
      />
    </div>

    <ChatInputField @send="(msg) => messages.push({ id: Date.now(), text: msg, timestamp: new Date().toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' }), isSent: true })" />
  </div>
</template>

<style lang="scss" scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px 0;
    display: flex;
    flex-direction: column;
  }
}
</style>
