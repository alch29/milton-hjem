<!-- Alek -->

<script setup>

const startDate = new Date('2026-01-10');
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

</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__container">
      <div 
        class="progress-bar__progress"
        :style="{ width: (currentValue / maxValue) * 100 + '%' }"
      >
      </div>
    </div>
    <div class="progress-bar__icon"></div>
    <div class="progress-bar__meta"></div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.progress-bar {

  &__container {
    background: $color-cta;
    height: 30px;
    width: 100%;
    border: solid 0.5px $color-text;
  }

  &__progress {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background: $color-primary;
  }
}
</style>
