import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

/**
 * Figures out which client we looking at.
 * If the logged-in user is a consultant, we use the selected client's ID.
 * If they're a client, we just use their own ID.
 * @returns {{ clientId: import('vue').ComputedRef<string|undefined> }}
 */
export function useClientId() {
  const userStore = useUserStore();

  /**
   * The ID of the client.
   * Switches between selectedUser and currentUser depending on the role.
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
