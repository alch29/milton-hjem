import { computed } from 'vue';

/** @module composables/useSortAndFilter */

/**
 * Takes a list of items and returns it sorted depending on what has been chosen.
 * Filtering checks if the item's title includes the search query (case-insensitive).
 * Sorting can be: 'newest', 'oldest', 'alphabetical', or 'alphabetical-reverse'.
 * Note: newest/oldest sorting uses uploadDate.seconds because Firestore timestamps aren't plain JS.
 * @memberof module:composables/useSortAndFilter
 * @param {Object[]} items - The list to work with.
 * @param {string} searchQuery - What the user typed in the search bar.
 * @param {string|null} sortOrder - The chosen sort option, or null for no sorting.
 * @returns {{ result: Object[] }}
 */
export function useSortAndFilter(items, searchQuery, sortOrder) {
  /**
   * The final list after filtering and sorting. Updates automatically when any input changes.
   * @member result
   * @memberof module:composables/useSortAndFilter
   * @type {Object[]}
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
