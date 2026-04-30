/** @module stores/image */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { collection, getDocs, addDoc, setDoc, doc, query, where } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/config/firebase';

export const useImageStore = defineStore('images', () => {

  // State
  const batches = ref([]);
  const error = ref(null);

  // Actions

  /**
   * Uploads an image to Firebase Storage and saves it under a batch in Firestore.
   * All images uploaded at the same time share a batchId, so they're grouped together.
   * We use setDoc with merge:true on the batch so we don't overwrite it when uploading multiple files.
   * @function uploadImage
   * @memberof module:stores/image
   * @param {File} params.file - The image file to upload.
   * @param {string} params.category - Which category the image belongs to.
   * @param {string} params.title - Title for the batch. Falls back to file name if empty.
   * @param {string} params.batchId - Shared ID for all images uploaded in the same session.
   * @param {string} params.clientId - The client this image belongs to.
   * @returns {Promise<void>}
   */
  async function uploadImage({file, category, title, batchId, clientId}) {
    error.value = null;
    try {
      const fileRef = storageRef(storage, `images/${category}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      const batchRef = doc(db, 'batches', batchId);
      await setDoc(batchRef, {
        title: title || file.name,
        uploadDate: new Date(),
        url: url,
        category: category.toLowerCase(),
        clientId: clientId
      }, { merge: true });

      await addDoc(collection(db, 'batches', batchId, 'images'), {
        file: url
      });
    } catch (err) {
      err.value = 'Kunne ikke uploade billede';
    }
  }

  /**
   * Fetches all batches for a category and client, and also loads the images inside each batch.
   * Images are stored as a subcollection under each batch document, so we need two queries.
   * @function fetchImages
   * @memberof module:stores/image
   * @param {string} category - The category to filter by (should be lowercase).
   * @param {string} clientId - The client whose images we want.
   * @returns {Promise<void>}
   */
  async function fetchImages(category, clientId) {
    error.value = null;
    try {
      const q = query(
        collection(db, 'batches'),
        where('category', '==', category),
        where('clientId', '==', clientId)
      );
      const batchSnapshot = await getDocs(q);

      batches.value = await Promise.all(
        batchSnapshot.docs.map(async (batchDoc) => {
          const imagesSnapshot = await getDocs(collection(db, 'batches', batchDoc.id, 'images'));
          const images = imagesSnapshot.docs.map(imgDoc => {
            return { id: imgDoc.id, url: imgDoc.data().file };
          });
          return { id: batchDoc.id, ...batchDoc.data(), images };
        })
      );
    } catch (err) {
      err.value = 'Kunne ikke hente billeder';
    }
  }

  return { batches, error, fetchImages, uploadImage };
});
