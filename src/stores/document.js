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

  /**
   * Uploads a document file to Firebase Storage and saves its metadata to Firestore.
   * @param {Object} params - Upload parameters.
   * @param {File} params.file - The file to upload.
   * @param {string} params.category - The category to file the document under.
   * @param {string} params.title - The display title for the document.
   * @param {string} params.clientId - The Firestore ID of the client this document belongs to.
   * @returns {Promise<void>}
   */
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

  /**
   * Fetches all documents for a given category and client from Firestore.
   * @param {string} category - The category to filter documents by.
   * @param {string} clientId - The Firestore ID of the client whose documents to fetch.
   * @returns {Promise<void>}
   */
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

  /**
   * Returns a function that filters the documents list by category.
   * @returns {function(string): Object[]} A function that takes a category string and returns matching documents.
   */
  const documentsByCategory = computed(() => {
    return (category) => {
      return documents.value.filter(d => {
        return d.category === category;
      });
    };
  });

  return { documents, error, fetchDocuments, uploadDocument, documentsByCategory };
});
