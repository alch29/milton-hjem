<script setup>
import { ref } from 'vue';

const message = ref('');
const showAttachMenu = ref(false);

const emit = defineEmits(['send', 'attach']);

function sendMessage() {
  if (!message.value.trim()) return;
  emit('send', message.value);
  message.value = '';
}

function toggleAttachMenu() {
  showAttachMenu.value = !showAttachMenu.value;
}

function selectAttachment(type) {
  showAttachMenu.value = false;
  // type is 'document' or 'photo'
  emit('attach', type);
}
</script>

<template>
  <div class="chat-input">
    <div
      v-if="showAttachMenu"
      class="attach-menu"
    >
      <button @click="selectAttachment('photo')">
        <img
          src="@/assets/icons/Photo.svg"
          alt="Photo"
        >
        <span>Foto</span>
      </button>
      <button @click="selectAttachment('document')">
        <img
          src="@/assets/icons/Document.svg"
          alt="Document"
        >
        <span>Dokument</span>
      </button>
    </div>

    <div class="input-row">
      <button
        class="attach-btn"
        @click="toggleAttachMenu"
      >
        <img
          src="@/assets/icons/Attach.svg"
          alt="Attach"
        >
      </button>
      <div class="input-wrapper">
        <input
          v-model="message"
          type="text"
          placeholder="Skriv en besked..."
          @keyup.enter="sendMessage"
        >
        <button
          class="send-btn"
          @click="sendMessage"
        >
          <img
            src="@/assets/icons/Sent.svg"
            alt="Send"
          >
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.chat-input {
  padding: 24px;
  background-color: $color-white;
  position: fixed;
  bottom: 76px;
  left: 0;
  right: 0;

  .attach-menu {
    position: absolute;
    bottom: 100%;
    left: 16px;
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    background-color: $color-white;
    border: 1px solid $color-primary-light;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 8px;
    width: max-content;

    button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      background: none;
      border: none;
      cursor: pointer;
      border-radius: 8px;
      font-family: $font-family-base;
      font-size: $body-mobile-size;
      color: $color-text;

      &:hover {
        background-color: $color-background;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .input-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .attach-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    flex-shrink: 0;

    img {
      width: 20px;
      height: 20px;
      transform: rotate(45deg);
    }
  }

  .input-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    border: 1px solid $color-primary-light;
    border-radius: 20px;
    padding: 0 12px;

    &:focus-within {
      border-color: $color-primary;
    }

    input {
      flex: 1;
      padding: 10px 0;
      border: none;
      outline: none;
      font-family: $font-family-base;
      font-size: $body-mobile-size;
      color: $color-text;
      background: transparent;
    }

    .send-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;

      img {
        width: 20px;
        height: 20px;
        transform: rotate(90deg);
      }
    }
  }
}
</style>