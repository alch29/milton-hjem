import { computed } from 'vue';
import { useUserStore } from '@/stores/user';

/** @module composables/useClientId */

/**
 * Figures out which client we're currently looking at.
 * If the logged-in user is a consultant, we use the selected client's ID.
 * If they're a client, we just use their own ID.
 * @memberof module:composables/useClientId
 * @returns {{ clientId: string|undefined }}
 */
export function useClientId() {
  const userStore = useUserStore();

  /**
   * The ID of the client.
   * Switches between selectedUser and currentUser depending on the role.
   * @member clientId
   * @memberof module:composables/useClientId
   * @type {string|undefined}
   */
  const clientId = computed(() => {
    return userStore.currentUser?.isConsultant
      ? userStore.selectedUser?.id
      : userStore.currentUser?.id;
  }
  );

  return { clientId };
}
