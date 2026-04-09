<script setup>
import { ref } from 'vue';

//kun til test
const images = [
  new URL('../assets/images/Fodlister1.jpg', import.meta.url).href,
  new URL('../assets/images/Fodlister2.jpg', import.meta.url).href,
  new URL('../assets/images/Fodlister3.jpg', import.meta.url).href
]

const activeIndex = ref(0);

const prev = () => {
  if (activeIndex.value > 0) activeIndex.value--
}

const next = () => {
  if (activeIndex.value < images.length - 1) activeIndex.value++
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
          :style="{ '--bg-image': `url(${image})` }"
          v-show="activeIndex === index"
        >
          <div class="image-carousel__close">
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

  &__container {
    margin: 24px;
    // padding: 24px;
    background: $color-primary-light;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__images {

  }

  &__image {
    width: 100%;
    height: 300px;
    background-image: var(--bg-image);
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0;
    padding: 24px;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
}
</style>
