import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/config/firebase';

export const useImageStore = defineStore('images', () => {

  // State
  const images = ref([]);
  const error = ref(null);

  // Actions

  // LOOK AT THIS DUMBASS
  async function uploadImage({file, category, title, batchId, clientId}) {
    error.value = null;
    try {
      const fileRef = storageRef(storage, `images/${category}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      await addDoc(collection(db, 'images'), {
        title: title || file.name,
        uploadDate: new Date(),
        url: url,
        category: category.toLowerCase(),
        batchId: batchId,
        clientId: clientId
      });
    } catch (err) {
      err.value = 'Kunne ikke uploade billede';
    }
  }

  async function fetchImages(category, clientId) {
    error.value = null;
    try {
      const q = query(
        collection(db, 'images'),
        where('category', '==', category),
        where('clientId', '==', clientId)
      );
      const snapshot = await getDocs(q);
      images.value = snapshot.docs.map(d => {
        return { id: d.id, ...d.data() };
      });
    } catch (err) {
      err.value = 'Kunne ikke hente billeder';
    }
  }

  // Getters
  const imagesByCategory = computed(() => {
    return (category) => {
      return images.value.filter(i => {
        return i.category === category;
      });
    };
  });

  return { images, error, fetchImages, uploadImage, imagesByCategory };
});
