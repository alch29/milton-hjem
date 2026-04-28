import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

export function useClientId() {
  const userStore = useUserStore();

  const clientId = computed(() =>
    userStore.currentUser?.isConsultant
      ? userStore.selectedUser?.id
      : userStore.currentUser?.id
  );

  return { clientId };
}
