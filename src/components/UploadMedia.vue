<script setup>
import Button from '@/components/Button.vue';
import InputField from './InputField.vue';

const categories = ['Gulv', 'Materialer', 'Elektricitet', 'Vægge', 'Udendørs', 'Væg'];
</script>

<template>
  <div class="upload-media">
    <div class="upload-media__container">
      <div class="upload-media__field">
        <div class="upload-media__icons">
          <img src="../assets/icons/Photo.svg">
          <img src="../assets/icons/Document.svg">
        </div>
        <p>Upload medie</p>
      </div>
      <div class="upload-media__input">
        <h3 class="upload-media__text">Tilføj titel:</h3>
        <InputField></InputField>
      </div>
      <div class="upload-media__input">
        <h3 class="upload-media__text">Tilføj beskrivelse:</h3>
        <InputField></InputField>
      </div>
      <div class="upload-media__categories">
        <h3 class="upload-media__text">Tilføj kategori:</h3>
        <div class="upload-media__category-buttons">
          <div v-for="category in categories">
            <Button variant="category">{{ category }}</Button>
          </div>
        </div>
      </div>
      <div class="upload-media__button">
        <Button>Upload</Button>
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
