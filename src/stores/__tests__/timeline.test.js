import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTimelineStore } from '../timeline';

describe('useTimelineStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const past = new Date();
  past.setDate(past.getDate() - 7);
  
  const future = new Date();
  future.setDate(future.getDate() + 7);

  const lastEvent = new Date();
  lastEvent.setDate(lastEvent.getDate() + 30);

  it('getVariant returns correct css class based on type and date', () => {
    const store = useTimelineStore();
  
    store.items = [
      { id: 1, type: 'meeting', date: future },
      { id: 2, type: 'meeting', date: future },
      { id: 3, type: 'completed', date: past },
      { id: 4, type: 'default', date: past }
    ];
  
    expect(store.getVariant(store.items[0], 0)).toBe('card--highlighted');
    expect(store.getVariant(store.items[1], 1)).toBe('card--meeting');
    expect(store.getVariant(store.items[2], 2)).toBe('card--completed');
    expect(store.getVariant(store.items[3], 3)).toBe('card--greyed-out');
  });

  it('nextIndex returns the index of the next upcoming event', () => {
    const store = useTimelineStore();
  
    store.items = [
      { id: 1, date: past },
      { id: 2, date: past },
      { id: 3, date: future }
    ];
  
    expect(store.nextIndex).toBe(2);
  });

  it('nextIndex returns -1 hvis alle events er i fortiden', () => {
    const store = useTimelineStore();
  
    store.items = [
      { id: 1, date: past },
      { id: 2, date: past }
    ];
  
    expect(store.nextIndex).toBe(-1);
  });

  it('previewItems returns next upcoming event', () => {
    const store = useTimelineStore();
  
    store.items = [
      { id: 1, date: past },
      { id: 1, date: new Date() },
      { id: 2, date: future },
      { id: 3, date: lastEvent }
    ];

    expect(store.previewItems[1].id).toBe(2);
  });

  it('previewItems returns only 3 events', () => {
    const store = useTimelineStore();
  
    store.items = [
      { id: 1, date: past },
      { id: 1, date: new Date() },
      { id: 2, date: future },
      { id: 3, date: lastEvent }
    ];
  
    expect(store.previewItems).toHaveLength(3);
  });
});