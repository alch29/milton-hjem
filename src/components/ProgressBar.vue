<script setup>

const startDate = new Date('2026-02-10');
const endDate = new Date('2027-03-01');
const today = new Date();

function calculateDays(startDate, endDate) {
    let start = startDate;
    let end = endDate;
    let timeDifference = end - start;
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
};

const currentValue = calculateDays(startDate, today);
const maxValue = calculateDays(startDate, endDate);
const progress = Math.min((currentValue / maxValue) * 100, 100)

function formattedEndDate() {
  const year = endDate.getFullYear();
  const date = endDate.getDate();
  const month = endDate.getMonth() + 1;
  
  return `${date}/${month}/${year}`;
};
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
      <p>Forventet slutdato: {{ formattedEndDate() }}</p>
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
