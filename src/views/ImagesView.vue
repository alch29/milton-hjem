<script setup>
import { useRouter } from 'vue-router'
import Card from '@/components/cardComponents/Card.vue'

const router = useRouter()

const categories = [
  { label: 'Gulv',          value: 'gulv'           },
  { label: 'Tag',           value: 'tag'            },
  { label: 'Elektricitet',  value: 'plantegninger'  },
  { label: 'Vægge',         value: 'elektricitet'   },
  { label: 'Udendørs',      value: 'udendoers'      },
  { label: 'Materialer',    value: 'materialer'     },
]

function goToCategory(category) {
  router.push({ name: 'image-category', params: { category } })
}
</script>

<template>
  <div class="images-view">
    <h1 class="images-view__title">Billedkategorier</h1>
    <div class="images-view__grid">
      <Card
        v-for="cat in categories"
        :key="cat.value"
        class="images-view__card"
        @click="goToCategory(cat.value)"
      >
        <template #icon>
          <img src="@/assets/icons/Photo.svg" alt="" class="images-view__icon" />
        </template>
        <template #content>
          <span class="images-view__label">{{ cat.label }}</span>
        </template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.images-view {
  padding: 16px;

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
