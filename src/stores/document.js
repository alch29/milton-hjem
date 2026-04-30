/** @module stores/document */
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
   * Uploads a document to Firebase Storage, then saves the metadata (title, date, url, etc.) to Firestore.
   * @function uploadDocument
   * @memberof module:stores/document
   * @param {File} params.file - The actual file being uploaded.
   * @param {string} params.category - Which category it goes under.
   * @param {string} params.title - A name for the document. Falls back to the file name if empty.
   * @param {string} params.clientId - The ID of the client this document should be uploaded to.
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
   * Gets all documents from Firestore that match a specific category and client.
   * @function fetchDocuments
   * @memberof module:stores/document
   * @param {string} category - The category to look for.
   * @param {string} clientId - The client's ID, so we only get their documents.
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
   * A computed getter that lets you filter documents by category.
   * Returns a function you call with a category string to get the matching documents.
   * @function documentsByCategory
   * @memberof module:stores/document
   * @returns {function(string): Object[]}
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
