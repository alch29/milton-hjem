<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import Card from '@/components/cardComponents/Card.vue';
import Calendar from '@/components/Calender.vue';
import TimelineCard from '@/components/timelineComponents/TimelineCard.vue';
import { useTimelineStore } from '@/stores/timeline';
import { useUserStore } from '@/stores/user';

const store = useTimelineStore();
const userStore = useUserStore();
onMounted(() => store.fetchTimeline());

const activeView = ref('timeline');
const selectedItem = ref(null);

function openCard(item) {
  selectedItem.value = item;
};

function closeCard() {
  selectedItem.value = null;
};

watchEffect(() => {
  if (userStore.currentUser?.id) store.fetchTimeline()
});
</script>

<template>
  <div class="timeline">
    <div class="timeline__header">
      <h3>Tidslinje for huset</h3>
      <div class="timeline__icons">
        <button 
          class="timeline__icon" 
          @click="activeView = 'calendar'" 
          :class="{ 'timeline__icon--active': activeView === 'calendar' }"
        >
          <img src="@/assets/icons/Calender.svg">
        </button>
        <button 
          class="timeline__icon" 
          @click="activeView = 'timeline'" 
          :class="{ 'timeline__icon--active': activeView === 'timeline' }"
        >
          <img src="@/assets/icons/Timeline.svg">
        </button>
      </div>
    </div>

    <Calendar v-if="activeView === 'calendar'" />

    <EditTimeline v-else-if="activeView === 'edit'" />

    <div v-else class="timeline__content">
      <div
        v-for="(item, index) in store.items"
        :key="item.id"
        :class="['timeline__item', store.getVariant(item, index)]"
      >
        <Card 
          :class="['card--standard', store.getVariant(item, index)]"
          @click="openCard(item)"
        >
          <template #content>{{ item.title }}</template>
          <template #meta>{{ store.formatDate(item.date) }}</template>
        </Card>
      </div>
    </div>
    <TimelineCard 
      v-if="selectedItem" 
      :item="selectedItem" 
      @close="closeCard" 
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;
  
.timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

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
      top: 30px;
      bottom: 30px;
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

  &__icons {
    display: flex;
    gap: 8px;
  }

  &__icon {
    width: 34px;
    height: 34px;
    padding: 4px;
    border: none;
    background: none;
    cursor: pointer;
    transition: ease 0.2s;

    &:hover,
    &--active {
      background-color: $color-primary;

      img {
        filter: brightness(0) invert(1);
      }
    }
  }
}
</style>