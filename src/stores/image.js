import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/config/firebase'

export const useImageStore = defineStore('images', () => {

  // State
  const images = ref([])
  const error = ref(null)

  // Actions
  async function uploadImage(file, category, title, batchId) {
    error.value = null
    try {
      const fileRef = storageRef(storage, `images/${category}/${file.name}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      await addDoc(collection(db, 'images'), {
        title: title || file.name,
        uploadDate: new Date(),
        url: url,
        category: category.toLowerCase(),
        batchId: batchId
      })
    } catch (err) {
      error.value = 'Kunne ikke uploade billede'
    }
  }

  async function fetchImages(category) {
    error.value = null
    try {
      const q = query(collection(db, 'images'), where('category', '==', category))
      const snapshot = await getDocs(q)
      images.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (err) {
      error.value = 'Kunne ikke hente billeder'
    }
  }

  // Getters
  const imagesByCategory = computed(() => (category) => {
    return images.value.filter(i => i.category === category)
  })

  return { images, error, fetchImages, uploadImage, imagesByCategory }
})
