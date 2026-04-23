<script setup>
import InputField from '../InputField.vue';
import Button from '../Button.vue';
import { ref } from 'vue';
import { useTimelineStore } from '@/stores/timeline';

const store = useTimelineStore();

const eventTypes = ref([
  'Standard', 'Møde', 'Huset står færdigt'
]);

const title = ref('');
const date = ref('');
const description = ref('')
const selectedEvent = ref(null);

function selectEvent(event) {
  selectedEvent.value = event;
};

async function submit() {
  if (!title.value || !date.value || !selectedEvent.value) return;
  await store.addEvent(title.value, date.value, selectedEvent.value);
  title.value = '';
  description.value = '';
  date.value = '';
  selectedEvent.value = null;
};
</script>

<template>
  <div class="edit-timeline">
    <h3>Tilføj ny begivenhed</h3>
    <div>
        <p>Titel:</p>
        <InputField v-model="title"/>
    </div>
    <div>
        <p>Kort beskrivelse:</p>
        <InputField v-model="description"/>
    </div>
    <div>
        <p>Dato:</p>
        <input type="date" v-model="date">
    </div>
    <div>
        <p>Type:</p>
        <Button
          v-for="event in eventTypes"
          :key="event"
          variant="category"
          :class="{ 'button--category-chosen': selectedEvent === event }"
          @click="selectEvent(event)"
        >
        {{ event }}
        </Button>
    </div>
    <div>
      <Button @click="submit">Tilføj ny begivenhed</Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.edit-timeline {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>