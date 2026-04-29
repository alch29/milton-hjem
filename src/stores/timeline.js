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

  const { formatDate } = useFormatDate();

  /**
   * Fetches the timeline events for the current client from Firestore and updates the state of the items array.
   * Uses selectedUser if available (from consultant view), otherwise falls back to currentUser.
   * Events are sorted chronologically by date.
   * @returns {Promise<void>} Returns a promise since it's an async function. Doesn't return any value/data (void), but updates state.
   */
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
      .map(userDocument => {
        return {
          id: userDocument.id,
          ...userDocument.data(),
          date: userDocument.data().date.toDate()
        };
      })
      .sort((a, b) => {
        return a.date - b.date;
      });
  };

  /**
   * The index of the next upcoming event in the items array (the first event on or after today).
   * Returns -1 if all events are in the past.
   * @type {import('vue').ComputedRef<number>} nextIndex is a Vue ComputedRef containing the type number.
   */
  const nextIndex = computed(() => {
    return items.value.findIndex(item => {
      return item.date >= today;
    });
  }
  );

  /**
   * A small set of timeline items for timeline preview component that is used on the homepage.
   * Shows the next upcoming event, the one after it, and the last event. Returns at most 3 items.
   * @type {import('vue').ComputedRef<Object[]>} previewItems is a Vue ComputedRef containing the type Object.
   */
  const previewItems = computed(() => {
    const next = nextIndex.value;
    const last = items.value[items.value.length - 1];
    const result = [];

    if (items.value[next]) result.push(items.value[next]);
    if (next > 0) result.push(items.value[next + 1]);
    if (last && last !== items.value[next] && last !== items.value[next + 1]) result.push(last);
  
    return result;
  });

  /**
   * Returns a CSS class string for a timeline card based on its type, date, and position.
   * @param {Object} item - The timeline event object.
   * @param {number} index - The index of the item in the items array.
   * @returns {string} A CSS class string (e.g. 'card--highlighted', 'card--completed').
   */
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