<script setup>
import { computed } from 'vue';
import { useTimelineStore } from '@/stores/timeline';
const store = useTimelineStore();

const startDate = computed(() => store.items[0]?.date);
const endDate = computed(() => store.items[store.items.length - 1]?.date);
const today = new Date();

function calculateDays(startDate, endDate) {
    let timeDifference = endDate - startDate;
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
};

const currentValue = computed(() => calculateDays(startDate.value, today));
const maxValue = computed(() => calculateDays(startDate.value, endDate.value));
const progress = computed(() => Math.min((currentValue.value / maxValue.value) * 100, 100));

const formattedEndDate = computed(() => {
  if (!endDate.value) return '';
  const year = endDate.value.getFullYear();
  const date = endDate.value.getDate();
  const month = endDate.value.getMonth() + 1;
  return `${date}/${month}/${year}`;
});
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__container">
      <div class="progress-bar__full-progress">
        <div
          class="progress-bar__current-progress"
          :style="{ width: progress + '%' }"
        >
        </div>
      </div>
      <div class="progress-bar__icon"><img src="../assets/icons/Goal.svg"></div>
    </div>
    <div class="progress-bar__meta">
      <p>Forventet slutdato: {{ formattedEndDate }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.progress-bar {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__container {
    display: flex;
    gap: 8px;
  }

  &__full-progress {
    background: $color-cta;
    height: 30px;
    width: 100%;
    border: solid 0.5px $color-text;
  }

  &__current-progress {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: $color-primary;
  }

  &__icon {
    width: 34px;
  }
}
</style>
