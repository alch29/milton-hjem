<script setup>
import { ref, computed } from 'vue'
import Sort from '@/components/Sort.vue'

const images = ref([
  { id: 1, name: 'Billede1.jpg', uploadedAt: '2024-01-15' },
  { id: 2, name: 'Billede2.jpg', uploadedAt: '2024-03-02' },
  { id: 3, name: 'Billede3.jpg', uploadedAt: '2023-11-20' },
  { id: 4, name: 'Billede4.jpg', uploadedAt: '2024-05-10' },
  { id: 5, name: 'Billede5.jpg', uploadedAt: '2023-08-30' },
])

const sortOrder = ref(null)

const sortedImages = computed(() => {
  const imgs = [...images.value]
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

    <ul class="images-view__list">
      <li
        v-for="img in sortedImages"
        :key="img.id"
        class="images-view__item"
      >
        <div class="images-view__info">
          <span class="images-view__name">{{ img.name }}</span>
          <span class="images-view__date">{{ img.uploadedAt }}</span>
        </div>
      </li>
    </ul>

  </div>
</template>

<style lang="scss" scoped>
</style>
