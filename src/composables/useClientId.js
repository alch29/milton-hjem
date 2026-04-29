import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

/**
 * Composable that resolves the correct clientId based on the current user's role.
 * Consultants operate on the selectedUser; clients operate on themselves.
 * @returns {{ clientId: import('vue').ComputedRef<string|undefined> }}
 */
export function useClientId() {
  const userStore = useUserStore();

  /**
   * The Firestore ID of the client in context.
   * For consultants this is selectedUser.id; for clients this is currentUser.id.
   * @type {import('vue').ComputedRef<string|undefined>}
   */
  const clientId = computed(() => {
    return userStore.currentUser?.isConsultant
      ? userStore.selectedUser?.id
      : userStore.currentUser?.id;
  }
  );

  return { clientId };
}
