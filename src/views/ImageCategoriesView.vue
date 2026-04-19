<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sort from '@/components/Sort.vue'
import SearchBar from '@/components/SearchBar.vue'
import Card from '@/components/cardComponents/Card.vue'
import { useImageStore } from '@/stores/image'

const route = useRoute()
const imageStore = useImageStore()

const sortOrder = ref(null)
const searchQuery = ref('')

onMounted(() => {
  imageStore.fetchImages(route.params.category)
})

const sortedImages = computed(() => {
  let imgs = [...imageStore.images]
  if (searchQuery.value) imgs = imgs.filter(img => img.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  if (sortOrder.value === 'newest') return imgs.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
  if (sortOrder.value === 'oldest') return imgs.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate))
  if (sortOrder.value === 'alphabetical') return imgs.sort((a, b) => a.title.localeCompare(b.title))
  if (sortOrder.value === 'alphabetical-reverse') return imgs.sort((a, b) => b.title.localeCompare(a.title))
  return imgs
})
</script>

<template>
  <div class="images-categories-view">
    <Sort @sort="value => sortOrder = value" />
    <SearchBar @search="query => searchQuery = query" />
      
    <div class="images-categories-view__list">
      <Card v-for="img in sortedImages" :key="img.id">
        <template #icon-left>
          <img src="@/assets/icons/Photo.svg" alt="Billede" class="images-categories-view__icon" />
        </template>
        <template #content>
          <span class="images-categories-view__name">{{ img.title }}</span>
        </template>
        <template #meta>
          <span class="images-categories-view__date">{{ new Date(img.uploadDate?.seconds * 1000).toLocaleDateString('da-DK') }}</span>
        </template>
      </Card>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.images-categories-view {
  padding: 16px;

  &__list {
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    :deep(.card__content) {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }

  &__name {
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
  }

  &__date {
    font-family: $font-family-base;
    font-size: $bread-mobile-size;
    line-height: $bread-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text-light;
  }
}
</style>
