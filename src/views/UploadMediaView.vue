<script setup>
import { ref } from 'vue'
import UploadMedia from '@/components/UploadMedia.vue'
import Card from '@/components/cardComponents/Card.vue'

const activeType = ref(null)
</script>

<template>
  <div class="upload-media-view">
    <h1 class="upload-media-view__title">Upload medie</h1>
    <div class="upload-media-view__grid">
      <Card class="upload-media-view__card" @click="activeType = 'images'">
        <template #icon-left>
          <img src="@/assets/icons/Photo.svg" alt="" class="upload-media-view__icon" />
        </template>
        <template #content>
          <span class="upload-media-view__label">Upload billeder</span>
        </template>
      </Card>      
      <Card class="upload-media-view__card" @click="activeType = 'documents'">
        <template #icon-left>
          <img src="@/assets/icons/Document.svg" alt="" class="upload-media-view__icon" />
        </template>
        <template #content>
          <span class="upload-media-view__label">Upload dokumenter</span>
        </template>
      </Card>
    </div>
    <h3 class="upload-media-view__title">Seneste uploads</h3>
    <UploadMedia v-if="activeType" :type="activeType" @close="activeType = null" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.upload-media-view {
  padding: 16px;

  &__title {
    padding: 20px 0;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  &__card {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    gap: 10px;
    cursor: pointer;

    &:hover {
      background-color: $color-background;
    }

    :deep(.card__content) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    :deep(img) {
      width: 80px;
      height: 80px;
    }
  }

  &__label {
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
  }
}
</style>
