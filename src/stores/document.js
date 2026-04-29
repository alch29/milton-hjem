import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/config/firebase';

export const useDocumentStore = defineStore('documents', () => {

  // State
  const documents = ref([]);
  const error = ref(null);

  // Actions
  // LOOK AT THIS DUMBASS
  async function uploadDocument({file, category, title, clientId}) {
    error.value = null;
    try {
      const fileRef = storageRef(storage, `documents/${category}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      await addDoc(collection(db, 'documents'), {
        title: title || file.name,
        uploadDate: new Date(),
        url: url,
        category: category.toLowerCase(),
        clientId: clientId
      });
    } catch (err) {
      err.value = 'Kunne ikke uploade dokument';
    }
  }

  async function fetchDocuments(category, clientId) {
    error.value = null;
    try {
      const q = query(
        collection(db, 'documents'),
        where('category', '==', category),
        where('clientId', '==', clientId)
      );
      const snapshot = await getDocs(q);
      documents.value = snapshot.docs.map(d => {
        return { id: d.id, ...d.data() };
      });
    } catch (err) {
      err.value = 'Kunne ikke hente dokumenter';
    }
  }

  // Getters
  const documentsByCategory = computed(() => {
    return (category) => {
      return documents.value.filter(d => {
        return d.category === category;
      });
    };
  });

  return { documents, error, fetchDocuments, uploadDocument, documentsByCategory };
});
