<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/Button.vue'
import InputField from './InputField.vue'
import { useDocumentStore } from '@/stores/document'
import { useImageStore } from '@/stores/image'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const documentStore = useDocumentStore()
const imageStore = useImageStore()
const userStore = useUserStore()

const documentCategories = ['Kontrakter', 'Godkendelser', 'Plantegninger', 'Materialer', 'Fejl & Mangler', 'Andet']
const imageCategories = ['Gulv', 'Tag', 'Elektricitet', 'Vægge', 'Udendørs', 'Materialer']

const categories = computed(() => props.type === 'documents' ? documentCategories : imageCategories)

const selectedFiles = ref([])
const selectedCategory = ref(null)
const title = ref('')

function onFileChange(event) {
  selectedFiles.value = Array.from(event.target.files)
}

function selectCategory(category) {
  selectedCategory.value = category
}

async function handleUpload() {
  if (!selectedFiles.value.length || !selectedCategory.value) return
  const batchId = Date.now().toString()
  const clientId = userStore.currentUser?.isConsultant
    ? userStore.selectedUser?.id
    : userStore.currentUser?.id
  for (const file of selectedFiles.value) {
    if (props.type === 'documents') {
      await documentStore.uploadDocument(file, selectedCategory.value, title.value.trim(), clientId)
    } else {
      await imageStore.uploadImage(file, selectedCategory.value, title.value.trim(), batchId, clientId)
    }
  }
  selectedFiles.value = []
  selectedCategory.value = null
  title.value = ''
  emit('close')
}
</script>

<template>
  <div class="upload-media" @click.self="emit('close')">
    <div class="upload-media__container">
      <div class="upload-media__field" @click="$refs.fileInput.click()">
        <div class="upload-media__icons">
          <img src="../assets/icons/Photo.svg">
          <img src="../assets/icons/Document.svg">
        </div>
        <p>{{ selectedFiles.length ? `${selectedFiles.length} fil(er) valgt` : 'Upload medie' }}</p>
        <input ref="fileInput" type="file" multiple style="display: none" @change="onFileChange" />
      </div>

      <div class="upload-media__input">
        <h3 class="upload-media__text">Tilføj titel:</h3>
        <InputField v-model="title" placeholder="Titel" />
      </div>

      <div class="upload-media__categories">
        <h3 class="upload-media__text">Tilføj kategori:</h3>
        <div class="upload-media__category-buttons">
          <div v-for="category in categories" :key="category">
            <Button
              variant="category"
              :class="{ 'button--category-chosen': selectedCategory === category }"
              @click="selectCategory(category)"
            >{{ category }}</Button>
          </div>
        </div>
      </div>

      <div class="upload-media__button">
        <Button @click="handleUpload" :disabled="!selectedFiles.length || !selectedCategory">Upload</Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;

.upload-media {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: $mobile-width;
  background: rgba(46, 46, 46, 0.6);
  z-index: 100;
  margin: 0 auto;

  &__container {
    margin: 24px;
    padding: 24px;
    background-color: $color-white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: dashed 1px $color-text;
    padding: 48px;
    gap: 24px;
    cursor: pointer;
  }

  &__icons {
    display: flex;
    gap: 10px;

    & img {
      width: 70px;
    }
  }

  &__text {
    margin-bottom: 10px;
  }

  &__category-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__button {
    align-self: center;
  }
}
</style>
