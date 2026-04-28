<script setup>
import { ref } from 'vue';
import Button from './Button.vue';
import { useFormatDate } from '@/composables/useFormatDate';

const { formatDate } = useFormatDate();
const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  startIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close'])

const activeIndex = ref(props.startIndex);

const prev = () => {
  if (activeIndex.value > 0) activeIndex.value--
}

const next = () => {
  if (activeIndex.value < props.images.length - 1) activeIndex.value++
}
</script>

<template>
  <div class="image-carousel">
    <div class="image-carousel__container">
      <div class="image-carousel__images">
        <div
          class="image-carousel__image"
          v-for="(image, index) in images"
          :key="index"
          :style="{ '--background-image': `url(${image.url})` }"
          v-show="activeIndex === index"
        >
          <div class="image-carousel__close" @click="emit('close')">
            <img src="../assets/icons/Cross.svg">
          </div>
          <div class="image-carousel__nav">
            <div class="image-carousel__prev" @click="prev">
              <img src="../assets/icons/Arrow.svg">
            </div>
            <div class="image-carousel__index">
              <p>{{ activeIndex + 1 }}/{{ images.length }}</p>

            </div>
            <div class="image-carousel__next" @click="next">
              <img src="../assets/icons/Arrow.svg">
            </div>
          </div>
        </div>
      </div>
      <div class="image-carousel__meta">
        <span class="image-carousel__title">{{ images[activeIndex].title }}</span>
        <span class="image-carousel__date">{{ formatDate(new Date(images[activeIndex].uploadDate?.seconds * 1000)) }}</span>
      </div>
      <div class="image-carousel__buttons">
        <Button variant="cta-secondary">Download<img src="../assets/icons/Download.svg"></Button>
        <Button variant="cta-secondary">Vidersend til byggerådgiver<img class="image-carousel__buttons--sent" src="../assets/icons/Sent.svg"></Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.image-carousel {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: $mobile-width;
  background: rgba(46, 46, 46, 0.6);
  z-index: 100;
  margin: 0 auto;
  display: flex;
  align-items: center;

  &__container {
    margin: 24px;
    background: $color-primary-light;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__image {
    width: 100%;
    height: 300px;
    background-image: var(--background-image);
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__close {
    cursor: pointer;
    width: 24px;
    align-self: flex-end;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-self:center
  }

  &__prev {
    width: 20px;
    cursor: pointer;
    transform: scaleX(-1);
  }

  &__next {
    width: 20px;
    cursor: pointer;
  }

  &__meta {
    padding: 0 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-family: $font-family-base;
    font-size: $h3-mobile-size;
    line-height: $h3-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
  }

  &__date {
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
  }

  &__buttons {
    padding: 0px 24px 24px 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    &--sent {
      transform: rotate(90deg);
    }
  }
}
</style>
