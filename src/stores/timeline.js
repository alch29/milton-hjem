import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useUserStore } from './user';
import { useFormatDate } from '@/composables/useFormatDate';

export const useTimelineStore = defineStore('timeline', () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const items = ref([]);

  async function fetchTimeline() {
    const userStore = useUserStore();
    const clientId = userStore.selectedUser?.id ?? userStore.currentUser?.id;
    if (!clientId) return;

    const q = query(collection(db, 'timelines'), where('clientId', '==', clientId));
    const timelineSnapshot = await getDocs(q);
    if (timelineSnapshot.empty) return;

    const timelineDoc = timelineSnapshot.docs[0];
    const eventsSnapshot = await getDocs(collection(db, 'timelines', timelineDoc.id, 'events'));
    
    items.value = eventsSnapshot.docs
      .map(document => ({
        id: document.id,
        ...document.data(),
        date: document.data().date.toDate()
      }))
      .sort((a, b) => a.date - b.date);
  };

  const nextIndex = computed(() =>
    items.value.findIndex(item => item.date >= today)
  );

  const previewItems = computed(() => {
    const next = nextIndex.value;
    const last = items.value[items.value.length - 1];
    const result = [];

    if (items.value[next]) result.push(items.value[next]);
    if (next > 0) result.push(items.value[next + 1]);
    if (last && last !== items.value[next] && last !== items.value[next + 1]) result.push(last);
  
    return result;
  });

  // const formatDate = (date) =>
  //   date.toLocaleDateString('da-DK', { day: 'numeric', month: 'numeric', year: 'numeric' });
  const { formatDate } = useFormatDate();

  const getVariant = (item, index) => {
    if (item.type === 'completed') return 'card--completed';
    if (index === nextIndex.value) return 'card--highlighted';
    if (item.date < today) return 'card--greyed-out';
    if (item.type === 'meeting') return 'card--meeting';
    return 'card--default';
  };

  return { 
    items, 
    nextIndex,
    previewItems,
    formatDate, 
    getVariant,
    fetchTimeline
  };
});