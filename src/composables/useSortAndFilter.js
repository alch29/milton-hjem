import { computed } from 'vue';

export function useSortAndFilter(items, searchQuery, sortOrder) {
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
