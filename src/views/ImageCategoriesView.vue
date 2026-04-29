<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Sort from '@/components/Sort.vue';
import SearchBar from '@/components/SearchBar.vue';
import CardImageCategory from '@/components/cardComponents/CardImageCategory.vue';
import ImageCarousel from '@/components/ImageCarousel.vue';
import { useImageStore } from '@/stores/image';
import { useClientId } from '@/composables/useClientId';
import { useFormatDate } from '@/composables/useFormatDate';
import { useSortAndFilter } from '@/composables/useSortAndFilter';

const { formatDate } = useFormatDate();
const route = useRoute();
const imageStore = useImageStore();
const { clientId } = useClientId();

const sortOrder = ref(null);
const searchQuery = ref('');
const carouselStartIndex = ref(0);
const showCarousel = ref(false);
const activeBatch = ref([]);

onMounted(() => {
  imageStore.fetchImages(route.params.category, clientId.value);
});

const { result: sortedBatches } = useSortAndFilter(
  computed(() => {
    return imageStore.batches;
  }),
  searchQuery,
  sortOrder
);

function openCarousel(batch) {
  activeBatch.value = batch.images.map(img => {
    return {
      ...img,
      title: batch.title,
      uploadDate: batch.uploadDate
    };
  });
  carouselStartIndex.value = 0;
  showCarousel.value = true;
}
</script>

<template>
  <div class="images-categories-view">
    <Sort @sort="value => sortOrder = value" />
    <SearchBar @search="query => searchQuery = query" />

    <div class="images-categories-view__list">
      <CardImageCategory
        v-for="batch in sortedBatches"
        :key="batch.id"
        class="images-categories-view__card"
        @click="openCarousel(batch)"
      >
        <template #title>
          <span class="images-categories-view__name">{{ batch.title }}</span>
        </template>
        <template #meta>
          <span class="images-categories-view__date">{{ formatDate(new Date(batch.uploadDate?.seconds * 1000)) }}</span>
        </template>
        <template #image-count>
          <span>{{ batch.images.length }}</span>
        </template>
        <template #image>
          <img
            :src="batch.url"
            :alt="batch.title"
          >
        </template>
      </CardImageCategory>
    </div>

    <ImageCarousel
      v-if="showCarousel"
      :images="activeBatch"
      :start-index="carouselStartIndex"
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
