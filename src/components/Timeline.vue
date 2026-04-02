<script setup>
import { computed } from 'vue';
import Card from '@/components/cardComponents/Card.vue';

const today = new Date();
today.setHours(0, 0, 0, 0);

const timeline = [
  { id: 1, title: 'Opstart', date: new Date('2026-01-10'), type: 'default' },
  { id: 2, title: 'Fundament støbt', date: new Date('2026-02-20'), type: 'default' },
  { id: 3, title: 'Møde med arkitekt', date: new Date('2026-04-05'), type: 'meeting' },
  { id: 4, title: 'Rejsegilde', date: new Date('2026-06-15'), type: 'default' },
  { id: 4, title: 'Rejsegilde', date: new Date('2026-06-15'), type: 'default' },
  { id: 5, title: 'Møde med entreprenør', date: new Date('2026-09-01'), type: 'meeting' },
  { id: 6, title: 'Indflytning', date: new Date('2027-03-01'), type: 'completed' },
]

const formatDate = (date) =>
  date.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });

const nextIndex = computed(() =>
  timeline.findIndex(item => item.date >= today)
);

const getVariant = (item, index) => {
  if (item.type === 'completed') return 'card--completed'
  if (index === nextIndex.value) return 'card--highlighted'
  if (item.date < today) return 'card--greyed-out'
  if (item.type === 'meeting') return 'card--meeting'
  return ''
};
</script>

<template>
  <div class="timeline">
    <div
      v-for="(item, index) in timeline"
      :key="item.id"
      :class="['timeline__item', getVariant(item, index)]"
    >
      <Card :class="['card--standard', getVariant(item, index)]">
        <template #content>{{ item.title }}</template>
        <template #meta>{{ formatDate(item.date) }}</template>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;
.timeline {
  position: relative;
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  // Den lodrette linje
  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 24px;
    bottom: 24px;
    width: 1px;
    background: $color-text;
  }

  &__item {
    position: relative;

    // Lille cirkel som standard
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

    // Store cirkler på vigtige kort
    &.card--highlighted::before,
    &.card--meeting::before,
    &.card--completed::before {
      width: 14px;
      height: 14px;
      left: -30.5px;
      background: $color-background;
    }
  }
}
</style>
