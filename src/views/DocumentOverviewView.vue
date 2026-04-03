<script setup>
import { ref, computed } from 'vue'
import Sort from '@/components/Sort.vue'
import SearchBar from '@/components/SearchBar.vue'

const documents = ref([
  { id: 1, name: 'Huslejekontrakt.pdf', uploadedAt: '2024-01-15' },
  { id: 2, name: 'Forsikringsdokument.pdf', uploadedAt: '2024-03-02' },
  { id: 3, name: 'Vedligeholdelsesplan.docx', uploadedAt: '2023-11-20' },
  { id: 4, name: 'Budgetrapport.xlsx', uploadedAt: '2024-05-10' },
  { id: 5, name: 'Årsregnskab.pdf', uploadedAt: '2023-08-30' },
])

const sortOrder = ref(null)
const searchQuery = ref('')

const sortedDocuments = computed(() => {
  let docs = [...documents.value]
  if (searchQuery.value) docs = docs.filter(doc => doc.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  if (sortOrder.value === 'newest') return docs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
  if (sortOrder.value === 'oldest') return docs.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt))
  if (sortOrder.value === 'alphabetical') return docs.sort((a, b) => a.name.localeCompare(b.name))
  if (sortOrder.value === 'alphabetical-reverse') return docs.sort((a, b) => b.name.localeCompare(a.name))
  return docs
})

function handleSort(value) {
  sortOrder.value = value
}
</script>

<template>
  <div class="documents-overview-view">
    <Sort @sort="handleSort" />
    <SearchBar @search="query => searchQuery = query" />
      
    <ul class="documents-overview-view__list">
      <li
        v-for="doc in sortedDocuments"
        :key="doc.id"
        class="documents-overview-view__item"
      >
        <img src="@/assets/icons/Document.svg" alt="Dokument" />
        <div class="documents-overview-view__info">
          <span class="documents-overview-view__name">{{ doc.name }}</span>
          <span class="documents-overview-view__date">{{ doc.uploadedAt }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.documents-overview-view {
  padding: 16px;

  &__list {
    list-style: none;
    padding: 0;
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: $color-white;
    border: 1px solid $color-primary-light;

    img {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }
  }

  &__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
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
