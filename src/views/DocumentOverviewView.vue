<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Sort from '@/components/Sort.vue';
import SearchBar from '@/components/SearchBar.vue';
import Card from '@/components/cardComponents/Card.vue';
import { useDocumentStore } from '@/stores/document';
import { useClientId } from '@/composables/useClientId';
import { useFormatDate } from '@/composables/useFormatDate';  
import { useSortAndFilter } from '@/composables/useSortAndFilter';

const { formatDate } = useFormatDate();
const route = useRoute();
const documentStore = useDocumentStore();
const { clientId } = useClientId();

const sortOrder = ref(null);
const searchQuery = ref('');

onMounted(() => {
  documentStore.fetchDocuments(route.params.category, clientId.value);
});

const { result: sortedDocuments } = useSortAndFilter(
  computed(() => {
    return documentStore.documents;
  }),
  searchQuery,
  sortOrder
);

function openDocument(url) {
  window.open(url, '_blank');
};
</script>

<template>
  <div class="documents-overview-view">
    <Sort @sort="value => sortOrder = value" />
    <SearchBar @search="query => searchQuery = query" />
      
    <div class="documents-overview-view__list">
      <Card
        v-for="doc in sortedDocuments"
        :key="doc.id"
        @click="openDocument(doc.url)"
      >
        <template #icon-left>
          <img
            src="@/assets/icons/Document.svg"
            alt="Dokument"
            class="documents-overview-view__icon"
          >
        </template>
        <template #content>
          <span class="documents-overview-view__name">{{ doc.title }}</span>
        </template>
        <template #meta>
          <span class="documents-overview-view__date">{{ formatDate(new Date(doc.uploadDate?.seconds * 1000)) }}</span>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.documents-overview-view {
  padding: 24px;

  :deep(.card__content) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    :deep(.card) {
      cursor: pointer;
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
    align-self: center;
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
