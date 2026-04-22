import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useUserStore } from './user';

export const useTimelineStore = defineStore('timeline', () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const timelineId = ref(null); // kan fjernes hvis addEvent ikke skal bruges.

  const items = ref([]);

  async function fetchTimeline() {
    const userStore = useUserStore();
    const clientId = userStore.selectedUser?.id ?? userStore.currentUser?.id;
    if (!clientId) return;

    const q = query(collection(db, 'timelines'), where('clientId', '==', clientId));
    const timelineSnapshot = await getDocs(q);
    if (timelineSnapshot.empty) return;

    const timelineDoc = timelineSnapshot.docs[0];
    timelineId.value = timelineDoc.id; // kan fjernes hvis addEvent ikke skal bruges.
    const eventsSnapshot = await getDocs(collection(db, 'timelines', timelineDoc.id, 'events'));
    
    items.value = eventsSnapshot.docs
      .map(document => ({
        id: document.id,
        ...document.data(),
        date: document.data().date.toDate()
      }))
      .sort((a, b) => a.date - b.date);
  };

  // Nedenstående funktion skal muligvis ikke inkluderes, skal bruges til at oprette nye begivenheder i tidslinjer.
  async function addEvent(title, description, date, type) {
    if (!timelineId.value) return;
  
    const typeMap = {
      'Standard': 'default',
      'Møde': 'meeting',
      'Huset står færdigt': 'completed'
    };
  
    await addDoc(collection(db, 'timelines', timelineId.value, 'events'), {
      title,
      description,
      date: Timestamp.fromDate(new Date(date)),
      type: typeMap[type] ?? 'default'
    });
  
    await fetchTimeline();
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
    if (last && last !== items.value[next]) result.push(last);
  
    return result;
  });

  const formatDate = (date) =>
    date.toLocaleDateString('da-DK', { day: 'numeric', month: 'short', year: 'numeric' });

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
    fetchTimeline,
    addEvent
  };
});