import { defineStore } from 'pinia';
import { ref } from 'vue';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { getAuth } from 'firebase/auth';

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null);
  const selectedUser = ref(null);
  const users = ref([]);
  const consultant = ref(null);

  async function fetchCurrentUser() {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;
    if (!uid) return

    const snapshot = await getDoc(doc(db, 'users', uid));
    if (snapshot.exists()) {
      currentUser.value = { id: snapshot.id, ...snapshot.data() }
    };
  };

  async function fetchSelectedUser(userId) {
    const snapshot = await getDoc(doc(db, 'users', userId));
    if (snapshot.exists()) {
      selectedUser.value = { id: snapshot.id, ...snapshot.data() }
      sessionStorage.setItem('selectedUserId', userId);
    };
  };

  async function fetchAllClients() {
    const uid = currentUser.value?.id;
    const q = query(
      collection(db, 'users'),
      where('isConsultant', '==', false),
      where('consultantId', '==', uid)
    );
    const snapshot = await getDocs(q);
    users.value = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
  };

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
  }
});