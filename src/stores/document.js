import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/config/firebase'

export const useDocumentStore = defineStore('documents', () => {

  // State
  const documents = ref([])
  const error = ref(null)

  // Actions
  async function uploadDocument(file, category) {
    error.value = null
    try {
      const fileRef = storageRef(storage, `documents/${category}/${file.name}`)
      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)
      await addDoc(collection(db, 'documents'), {
        title: file.name,
        uploadDate: new Date(),
        url: url,
        category: category.toLowerCase()
      })
    } catch (error) {
      error.value = 'Kunne ikke uploade dokument'
    } 
  }

  async function fetchDocuments(category) {
    error.value = null
    try {
      const q = query(collection(db, 'documents'), where('category', '==', category))
      const snapshot = await getDocs(q)
      documents.value = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
    } catch (error) {
      error.value = 'Kunne ikke hente dokumenter'
    } 
  }

  // Getters
  const documentsByCategory = computed(() => (category) => {
    return documents.value.filter(d => d.category === category)
  })

  return { documents, error, fetchDocuments, uploadDocument, documentsByCategory }
})
