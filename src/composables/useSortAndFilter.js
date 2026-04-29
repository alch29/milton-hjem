import { computed } from 'vue';

/**
 * Composable that returns a filtered and sorted version of a reactive list.
 * Filtering matches against the item's title (case-insensitive).
 * Sorting supports: 'newest', 'oldest' (by uploadDate.seconds), 'alphabetical', 'alphabetical-reverse'.
 * @param {import('vue').ComputedRef<Object[]>} items - The reactive list to filter and sort.
 * @param {import('vue').Ref<string>} searchQuery - The search string to filter titles by.
 * @param {import('vue').Ref<string|null>} sortOrder - The active sort order key.
 * @returns {{ result: import('vue').ComputedRef<Object[]> }}
 */
export function useSortAndFilter(items, searchQuery, sortOrder) {
  /**
   * The filtered and sorted list, recomputed whenever items, searchQuery, or sortOrder change.
   * @type {import('vue').ComputedRef<Object[]>}
   */
  const result = computed(() => {
    let list = [...items.value];

    if (searchQuery.value) {
      list = list.filter(item => {
        return item.title?.toLowerCase().includes(searchQuery.value.toLowerCase());
      }
      );
    }

    if (sortOrder.value === 'newest') return list.sort((a, b) => {
      return b.uploadDate?.seconds - a.uploadDate?.seconds;
    });
    if (sortOrder.value === 'oldest') return list.sort((a, b) => {
      return a.uploadDate?.seconds - b.uploadDate?.seconds;
    });
    if (sortOrder.value === 'alphabetical') return list.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    if (sortOrder.value === 'alphabetical-reverse') return list.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });

    return list;
  });

  return { result };
}
