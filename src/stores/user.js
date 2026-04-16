import { defineStore } from 'pinia';
import { ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { getAuth } from 'firebase/auth';

export const useUserStore = defineStore('user', () => {
    const user = ref(null);

    async function fetchUser() {
        const auth = getAuth();
        const uid = auth.currentUser?.uid;
        if (!uid) return
      
        const snapshot = await getDoc(doc(db, 'users', uid));
        if (snapshot.exists()) {
          user.value = { id: snapshot.id, ...snapshot.data() }
        };
      };

    return { 
        user, 
        fetchUser,
    };
});