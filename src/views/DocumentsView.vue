<script setup>
import { useRouter } from 'vue-router';
import Card from '@/components/cardComponents/Card.vue';

const router = useRouter();

const categories = [
  { label: 'Kontrakter',       value: 'kontrakter'    },
  { label: 'Godkendelser',     value: 'godkendelser'  },
  { label: 'Plantegninger',    value: 'plantegninger' },
  { label: 'Materialer',       value: 'materialer'    },
  { label: 'Fejl & Mangler',   value: 'fejl & mangler'},
  { label: 'Andet',            value: 'andet'         }
];

function goToCategory(category) {
  router.push({ name: 'document-category', params: { category } });
}
</script>

<template>
  <div class="documents-view">
    <h1 class="documents-view__title">
      Mappeoversigt
    </h1>
    <div class="documents-view__grid">
      <Card
        v-for="cat in categories"
        :key="cat.value"
        class="documents-view__card"
        @click="goToCategory(cat.value)"
      >
        <template #icon-left>
          <img
            src="@/assets/icons/Folder.svg"
            alt=""
            class="documents-view__icon"
          >
        </template>
        <template #content>
          <span class="documents-view__label">{{ cat.label }}</span>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;


.documents-view {
  padding: 24px;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  &__card {
    cursor: pointer;

    &:hover {
      background-color: $color-background;
    }

    :deep(img) {
      width: 80px;
      height: 80px;
    }
  }

  :deep(.card) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    gap: 10px;
  }

  :deep(.card__content) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  &__icon {
    width: 80px;
    height: 80px;
  }

  &__label {
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
  }

  &__title {
    padding: 20px 0px;
  }
}
</style>
