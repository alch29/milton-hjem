<script setup>
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import InputField from './InputField.vue'
import { useDocumentStore } from '@/stores/document'
import { useImageStore } from '@/stores/image'

const documentStore = useDocumentStore()
const imageStore = useImageStore()

const documentCategories = ['Kontrakter', 'Godkendelser', 'Plantegninger', 'Materialer', 'Fejl & Mangler', 'Andet']
const imageCategories = ['Gulv', 'Tag', 'Elektricitet', 'Vægge', 'Udendørs', 'Materialer']

const activeTab = ref('documents')
const selectedFile = ref(null)
const selectedCategory = ref(null)
const title = ref('')

function onFileChange(event) {
  selectedFile.value = event.target.files[0]
}

function selectCategory(category) {
  selectedCategory.value = category
}

function switchTab(tab) {
  activeTab.value = tab
  selectedFile.value = null
  selectedCategory.value = null
  title.value = ''
}

async function handleUpload() {
  if (!selectedFile.value || !selectedCategory.value) return
  if (activeTab.value === 'documents') {
    await documentStore.uploadDocument(selectedFile.value, selectedCategory.value)
  } else {
    await imageStore.uploadImage(selectedFile.value, selectedCategory.value)
  }
  selectedFile.value = null
  selectedCategory.value = null
  title.value = ''
}

const categories = () => activeTab.value === 'documents' ? documentCategories : imageCategories
</script>

<template>
  <div class="upload-media">
    <div class="upload-media__container">
      <div class="upload-media__tabs">
        <button
          class="upload-media__tab"
          :class="{ 'upload-media__tab--active': activeTab === 'documents' }"
          @click="switchTab('documents')"
        >Dokumenter</button>
        <button
          class="upload-media__tab"
          :class="{ 'upload-media__tab--active': activeTab === 'images' }"
          @click="switchTab('images')"
        >Billeder</button>
      </div>

      <div class="upload-media__field" @click="$refs.fileInput.click()">
        <div class="upload-media__icons">
          <img src="../assets/icons/Photo.svg">
          <img src="../assets/icons/Document.svg">
        </div>
        <p>{{ selectedFile ? selectedFile.name : 'Upload medie' }}</p>
        <input ref="fileInput" type="file" style="display: none" @change="onFileChange" />
      </div>

      <div class="upload-media__input">
        <h3 class="upload-media__text">Tilføj titel:</h3>
        <InputField v-model="title" icon="Document" placeholder="Titel" />
      </div>

      <div class="upload-media__categories">
        <h3 class="upload-media__text">Tilføj kategori:</h3>
        <div class="upload-media__category-buttons">
          <div v-for="category in categories()" :key="category">
            <Button
              variant="category"
              :class="{ 'active': selectedCategory === category }"
              @click="selectCategory(category)"
            >{{ category }}</Button>
          </div>
        </div>
      </div>

      <div class="upload-media__button">
        <Button @click="handleUpload" :disabled="!selectedFile || !selectedCategory">Upload</Button>
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

  &__tabs {
    display: flex;
    gap: 8px;
  }

  &__tab {
    flex: 1;
    padding: 8px;
    border: 1px solid $color-text;
    background: transparent;
    border-radius: 6px;
    cursor: pointer;
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    color: $color-text;

    &--active {
      background-color: $color-text;
      color: $color-white;
    }
  }

  &__field {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: dashed 1px $color-text;
    padding: 48px;
    gap: 24px;
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
