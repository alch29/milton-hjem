<script setup>
import Card from '@/components/cardComponents/Card.vue'
import { RouterLink } from 'vue-router'
import { useTimelineStore } from '@/stores/timeline'

const store = useTimelineStore()
</script>

<template>
  <div class="timeline-preview">
    <div class="timeline-preview__header">
      <h3>Tidslinje for huset</h3>
      <RouterLink :to="{ name: 'timeline' }">
        <img class="timeline-preview__icon" src="../assets/icons/Timeline.svg">
      </RouterLink>
    </div>
    <div class="timeline-preview__content">
      <div
        v-for="(item, index) in store.previewItems"
        :key="item.id"
        :class="['timeline-preview__item', store.getVariant(item, store.items.indexOf(item))]"
      >
        <Card :class="['card--standard', store.getVariant(item, store.items.indexOf(item))]">
          <template #content>{{ item.title }}</template>
          <template #meta>{{ store.formatDate(item.date) }}</template>
        </Card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.timeline-preview {
    display: flex;
    flex-direction: column;
    gap: 24px;

    &__content {
        position: relative;
        padding-left: 32px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        &::before {
        content: '';
        position: absolute;
        left: 8px;
        top: 24px;
        bottom: 24px;
        width: 1px;
        background: $color-text;
        }
    }

    &__item {
        position: relative;

        &::before {
        content: '';
        position: absolute;
        left: -27.5px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1px solid $color-text;
        background: $color-background;
        z-index: 1;
        }

        &.card--highlighted::before,
        &.card--meeting::before,
        &.card--completed::before {
        width: 14px;
        height: 14px;
        left: -30.5px;
        background: $color-background;
        }
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & h3 {
            font-size: $h3-mobile-lh;
        }
    }
    

    &__icon {
        width: 34px;
        height: 34px;
        padding: 4px;
        border: none;
        background: none;
        cursor: pointer;
        transition: ease 0.2s;
    }
}
</style>