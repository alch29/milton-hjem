/** @module stores/user */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/config/firebase';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null);
  const selectedUser = ref(null);
  const users = ref([]);
  const consultant = ref(null);

  /**
   * Fetches the currently authenticated user from Firestore and stores them in currentUser.
   * Does nothing if no user is authenticated.
   * @function fetchCurrentUser
   * @memberof module:stores/user
   * @returns {Promise<void>}
   */
  async function fetchCurrentUser() {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const snapshot = await getDoc(doc(db, 'users', uid));
    if (snapshot.exists()) {
      currentUser.value = { id: snapshot.id, ...snapshot.data() };
    };
  };

  /**
   * Fetches a specific user by ID from Firestore and stores them in selectedUser.
   * Also saves the userId to sessionStorage so it stays through reloads.
   * @function fetchSelectedUser
   * @memberof module:stores/user
   * @param {string} userId - The Firestore document ID of the user to fetch.
   * @returns {Promise<void>}
   */
  async function fetchSelectedUser(userId) {
    const snapshot = await getDoc(doc(db, 'users', userId));
    if (snapshot.exists()) {
      selectedUser.value = { id: snapshot.id, ...snapshot.data() };
      sessionStorage.setItem('selectedUserId', userId);
    };
  };

  /**
   * Fetches all clients assigned to the currently logged-in consultant (for consultant view).
   * Filters users where isConsultant is false and consultantId matches the current user.
   * @function fetchAllClients
   * @memberof module:stores/user
   * @returns {Promise<void>}
   */
  async function fetchAllClients() {
    const uid = currentUser.value?.id;
    const q = query(
      collection(db, 'users'),
      where('isConsultant', '==', false),
      where('consultantId', '==', uid)
    );
    const snapshot = await getDocs(q);
    users.value = snapshot.docs.map(userDocument => {
      return { id: userDocument.id, ...userDocument.data() };
    });
  };

  /**
   * Fetches the consultant assigned to the current user and stores them in consultant (for client view).
   * Does nothing if the current user has no consultantId.
   * @function fetchConsultant
   * @memberof module:stores/user
   * @returns {Promise<void>}
   */
  async function fetchConsultant() {
    const consultantId = currentUser.value?.consultantId;
    if (!consultantId) return;

    const snapshot = await getDoc(doc(db, 'users', consultantId));
    if (snapshot.exists()) {
      consultant.value = { id: snapshot.id, ...snapshot.data() };
    };
  };

  return {
    currentUser,
    selectedUser,
    users,
    consultant,
    fetchCurrentUser,
    fetchSelectedUser,
    fetchAllClients,
    fetchConsultant
  };
});