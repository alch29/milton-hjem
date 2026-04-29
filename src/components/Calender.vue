<script setup>
import { ref, computed } from 'vue';
import { useTimelineStore } from '@/stores/timeline';

const store = useTimelineStore();

const getEventVariant = (day) => {
  const item = store.items.find(eventItem => {
    return eventItem.date.getDate() === day &&
    eventItem.date.getMonth() === currentMonth.value &&
    eventItem.date.getFullYear() === currentYear.value;
  }
  );
  if (!item) return null;
  const index = store.items.indexOf(item);
  return store.getVariant(item, index);
};

const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
}
);

const monthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleDateString('da-DK', { month: 'long', year: 'numeric' });
}
);

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11; currentYear.value--; 
  } else currentMonth.value--;
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0; currentYear.value++; 
  } else currentMonth.value++;
};
</script>

<template>
  <div class="calendar">
    <div class="calendar__header">
      <button @click="prevMonth">
        <img
          class="calendar__arrow calendar__arrow--left"
          src="@/assets/icons/Arrow.svg"
        >
      </button>
      <span class="calendar__month-name">{{ monthName }}</span>
      <button @click="nextMonth">
        <img
          class="calendar__arrow"
          src="@/assets/icons/Arrow.svg"
        >
      </button>
    </div>
    <div class="calendar__grid">
      <div class="calendar__day-names">
        <span
          v-for="day in ['M','T','O','T','F','L','S']"
          :key="day"
          class="calendar__day-name"
        >{{ day }}</span>
      </div>
      <div class="calendar__day-dates">
        <span
          v-for="day in daysInMonth"
          :key="day"
          class="calendar__day-date"
          :class="[
            getEventVariant(day)
          ]"
        >
          {{ day }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.calendar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: $h3-mobile-size;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: none;
      border: none;
      cursor: pointer;
      width: 24px;
      height: 24px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__month-name {
    text-transform: capitalize;
  }

  &__arrow {

    &--left {
      transform: scaleX(-1);
    }
  }

  &__grid {
    align-self: center;
  }

  &__day-names {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: fit-content;
    background: $color-primary-light;
  }

  &__day-name {
    padding: 14px;
    width: 50px;
    text-align: center;
  }

  &__day-dates {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: fit-content;
  }

  &__day-date {
    padding: 14px;
    width: 50px;
    border: solid 0.5px $color-text;
    text-align: center;
    position: relative;

    &.card--default::before,
    &.card--highlighted::before,
    &.card--meeting::before,
    &.card--completed::before,
    &.card--greyed-out::before {
      content: '';
      position: absolute;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid $color-text;
      z-index: -1;
    }

    &.card--highlighted::before {
      background: $color-primary-light;
    }

    &.card--meeting::before { 
      background: $color-cta; 
    }

    &.card--greyed-out,
    &.card--greyed-out::before {
      border-color: $color-text-light;
      color: $color-text-light;
    }
    
    &.card--completed {
      color: $color-white;

      &::before { 
        border-color: $color-primary;
        background: $color-primary;
        color: $color-white;
      }
    }
  }
}
</style>