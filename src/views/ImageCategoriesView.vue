<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sort from '@/components/Sort.vue'
import SearchBar from '@/components/SearchBar.vue'
import CardImageCategory from '@/components/cardComponents/CardImageCategory.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import { useImageStore } from '@/stores/image'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const imageStore = useImageStore()
const userStore = useUserStore()

const sortOrder = ref(null)
const searchQuery = ref('')
const carouselStartIndex = ref(0)
const showCarousel = ref(false)
const activeBatch = ref([])

onMounted(() => {
  const clientId = userStore.currentUser?.id
  imageStore.fetchImages(route.params.category, clientId)
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

const batches = computed(() => {
  const groups = {}
  for (const img of sortedImages.value) {
    const key = img.batchId || 'legacy'
    if (!groups[key]) groups[key] = []
    groups[key].push(img)
  }
  return Object.values(groups)
})

function openCarousel(batch) {
  activeBatch.value = batch
  carouselStartIndex.value = 0
  showCarousel.value = true
}
</script>

<template>
  <div class="images-categories-view">
    <Sort @sort="value => sortOrder = value" />
    <SearchBar @search="query => searchQuery = query" />

    <div class="images-categories-view__list">
      <CardImageCategory
        v-for="(batch, i) in batches"
        :key="i"
        class="images-categories-view__card"
        @click="openCarousel(batch)"
      >
        <template #title>
          <span class="images-categories-view__name">{{ batch[0].title }}</span>
        </template>
        <template #meta>
          <span class="images-categories-view__date">{{ new Date(batch[0].uploadDate?.seconds * 1000).toLocaleDateString('da-DK') }}</span>
        </template>
        <template #image-count>
          <span>{{ batch.length }}</span>
        </template>
        <template #image>
          <img :src="batch[0].url" :alt="batch[0].title" />
        </template>
      </CardImageCategory>
    </div>

    <ImageCarousel
      v-if="showCarousel"
      :images="activeBatch"
      :startIndex="carouselStartIndex"
      @close="showCarousel = false"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.images-categories-view {
  padding: 24px;

  &__list {
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__card {
    cursor: pointer;
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
