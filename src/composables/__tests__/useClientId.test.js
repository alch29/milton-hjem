import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useClientId } from '@/composables/useClientId';

// Mock Firebase so the user store can be created without a real Firebase connection
vi.mock('@/config/firebase', () => {
  return {
    db: {},
    auth: {},
    storage: {}
  };
});

vi.mock('firebase/firestore', () => {
  return {
    doc: vi.fn(),
    getDoc: vi.fn(),
    collection: vi.fn(),
    getDocs: vi.fn(),
    query: vi.fn(),
    where: vi.fn()
  };
});

// Before each test, create a fresh Pinia instance so store state doesn't carry over
beforeEach(() => {
  setActivePinia(createPinia());
});

describe('useClientId', () => {

  // Test 1: Checks that when the logged-in user is a consultant, clientId returns the selectedUser's ID
  it('returns selectedUser ID when the current user is a consultant', () => {
    const userStore = useUserStore();

    // Simulate a consultant who has selected a client to view
    userStore.currentUser = { id: 'consultant-1', isConsultant: true };
    userStore.selectedUser = { id: 'client-1' };

    const { clientId } = useClientId();

    // Return the selected client's ID
    expect(clientId.value).toBe('client-1');
  });

  // Test 2: Checks that when the logged-in user is a regular client, clientId returns their own ID
  it('returns currentUser ID when the current user is a client', () => {
    const userStore = useUserStore();

    // Simulate a regular client with no selected user
    userStore.currentUser = { id: 'client-2', isConsultant: false };
    userStore.selectedUser = null;

    const { clientId } = useClientId();

    // Return the client's own ID
    expect(clientId.value).toBe('client-2');
  });
});
