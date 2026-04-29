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
