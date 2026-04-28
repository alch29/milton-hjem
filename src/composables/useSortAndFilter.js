import { computed } from 'vue';

export function useSortAndFilter(items, searchQuery, sortOrder) {
  const result = computed(() => {
    let list = [...items.value];

    if (searchQuery.value) {
      list = list.filter(item =>
        item.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }

    if (sortOrder.value === 'newest') {
      return list.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    }
    if (sortOrder.value === 'oldest') {
      return list.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    }

    return list;
  });

  return { result };
}
