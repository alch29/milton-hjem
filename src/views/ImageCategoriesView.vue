<script setup>
import { ref, computed } from 'vue'
import Sort from '@/components/Sort.vue'
import SearchBar from '@/components/SearchBar.vue'
import Card from '@/components/cardComponents/Card.vue'

const images = ref([
  { id: 1, name: 'Billede1.jpg', uploadedAt: '2024-01-15' },
  { id: 2, name: 'Billede2.jpg', uploadedAt: '2024-03-02' },
  { id: 3, name: 'Billede3.jpg', uploadedAt: '2023-11-20' },
  { id: 4, name: 'Billede4.jpg', uploadedAt: '2024-05-10' },
  { id: 5, name: 'Billede5.jpg', uploadedAt: '2023-08-30' },
])

const sortOrder = ref(null)
const searchQuery = ref('')

const sortedImages = computed(() => {
  let imgs = [...images.value]
  if (searchQuery.value) imgs = imgs.filter(img => img.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  if (sortOrder.value === 'newest') return imgs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  if (sortOrder.value === 'oldest') return imgs.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt))
  if (sortOrder.value === 'alphabetical') return imgs.sort((a, b) => a.name.localeCompare(b.name))
  if (sortOrder.value === 'alphabetical-reverse') return imgs.sort((a, b) => b.name.localeCompare(a.name))
  return imgs
})
</script>

<template>
  <div class="images-categories-view">
    <Sort @sort="value => sortOrder = value" />
    <SearchBar @search="query => searchQuery = query" />
      
    <div class="images-categories-view__list">
      <Card v-for="img in sortedImages" :key="img.id">
        <template #icon>
          <img src="@/assets/icons/Photo.svg" alt="Billede" class="images-categories-view__icon" />
        </template>
        <template #content>
          <span class="images-categories-view__name">{{ img.name }}</span>
        </template>
        <template #meta>
          <span class="images-categories-view__date">{{ img.uploadedAt }}</span>
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
