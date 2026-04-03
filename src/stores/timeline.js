import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTimelineStore = defineStore('timeline', () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = ref([
    { id: 1, title: 'Opstart', date: new Date('2026-01-10'), type: 'default' },
    { id: 2, title: 'Fundament støbt', date: new Date('2026-02-20'), type: 'default' },
    { id: 3, title: 'Møde med arkitekt', date: new Date('2026-04-05'), type: 'meeting' },
    { id: 4, title: 'De indvendige vægge', date: new Date('2026-04-11'), type: 'default' },
    { id: 5, title: 'Rejsegilde', date: new Date('2026-06-15'), type: 'default' },
    { id: 6, title: 'Energimærket', date: new Date('2026-08-17'), type: 'default' },
    { id: 7, title: 'Møde med entreprenør', date: new Date('2026-09-01'), type: 'meeting' },
    { id: 8, title: 'Indflytning', date: new Date('2027-03-01'), type: 'completed' },
  ]);

  const nextIndex = computed(() =>
    items.value.findIndex(item => item.date >= today)
  );

  const formatDate = (date) =>
    date.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });

  const getVariant = (item, index) => {
    if (item.type === 'completed') return 'card--completed'
    if (index === nextIndex.value) return 'card--highlighted'
    if (item.date < today) return 'card--greyed-out'
    if (item.type === 'meeting') return 'card--meeting'
    return 'card--default'
  };

  return { 
    items, 
    nextIndex, 
    formatDate, 
    getVariant 
  };
});

//Dette er testdata til tidslinjen