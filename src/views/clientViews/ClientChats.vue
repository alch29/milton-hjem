<script setup>
import { useRouter } from 'vue-router';
import Card from '@/components/cardComponents/Card.vue';
import Accordion from '@/components/Accordion.vue';
import userIcon from '@/assets/icons/User.svg';
import { useUserStore } from '@/stores/user';

const store = useUserStore();

const router = useRouter();

const faqs = [
  { question: 'Må jeg ændre materialer eller plantegning undervejs?', 
    answer: 'Ja, indtil kontrakten er underskrevet. Efter underskrift er alle materialer bestilt. Kontakt derfor byggerådgiver hvis der ønskes justeringer. Alle ændringer skal være skriftlige.' },
  { question: 'Vejret er dårligt. HVad betyder dette for byggeprocessen?', 
    answer: 'Hvis der sker forsinkelser på grund af vejret bliver i kontaktet af jeres byggerådgiver' },
  { question: 'Hvornår er håndværkerne på grunden?', 
    answer: 'Støjende arbejde må ske på hverdage mellem kl. 7-18 og lørdage kl. 7-14.' },
  { question: 'Må jeg tage ud og se huset?', 
    answer: 'Af sikkerhedsmæssige årsager anbefaler vi ikke at i tager derud alene. Aftal derfor et møde med byggerådgiveren, for at se husets byggeproces' },
  { question: 'Hvordan downloader jeg filerne?', 
    answer: 'Når du trykker ind på valgte billeder eller filer kan du trykke på download-ikonet' },
  { question: 'Kan jeg kontakte byggeleder eller håndværkere?', 
    answer: 'Kontakt din byggerådgiver, hvis du ønsker direkte kontakt. Eller planlæg et måde med din byggerådgiver' },
];

const chats = [
  { id: 1, name: `${store.consultant?.firstName} ${store.consultant?.lastName}`, title: store.consultant?.role, avatar: userIcon, lastMessage: '10:24' },
];

function goToChat() {
  router.push({ name: 'chat' });
};
</script>

<template>
  <div class="client-chats-view">
    <h1 class="client-chats-view__title">Beskeder</h1>
    <div class="client-chats-view__list">
      <Card
        v-for="chat in chats"
        :key="chat.id"
        class="client-chats-view__card"
        @click="goToChat()"
      >
        <template #icon-left>
          <div class="client-chats-view__avatar">
            <img v-if="chat.avatar" :src="chat.avatar" :alt="chat.name" />
            <img v-else src="@/assets/icons/User.svg" :alt="chat.name" class="client-chats-view__avatar-placeholder" />
          </div>
        </template>
        <template #content>
          <div class="client-chats-view__info">
            <span class="client-chats-view__name">{{ chat.name }}</span>
            <span class="client-chats-view__role">{{ chat.title }}</span>
          </div>
        </template>
        <template #meta>
          <span class="client-chats-view__time">{{ chat.lastMessage }}</span>
        </template>
      </Card>
    </div>

    <div class="client-chats-view__faq">
      <h3 class="client-chats-view__faq-title">Ofte stillede spørgsmål</h3>
      <h2 class="client-chats-view__faq-subtitle">Har du spørgsmål?</h2>
      <p class="client-chats-view__faq-description">Se her for at finde svaret på dit spørgsmål inden du kontakter din byggerådgiver.</p>
      <div class="client-chats-view__faq-list">
        <Accordion
          v-for="faq in faqs"
          :key="faq.question"
          :question="faq.question"
          :answer="faq.answer"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;

.client-chats-view {
  padding: 24px;

  &__title {
    padding: 20px 0;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__card {
    cursor: pointer;

    &:hover {
      background-color: $color-background;
    }
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: $color-background;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      transform: scale(1);
      transform-origin: top center;
    }
  }

  &__avatar-placeholder {
    width: 24px; 
    height: 24px
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__name {
    font-family: $font-family-base;
    font-size: $h3-mobile-size;
    line-height: $body-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text;
  }

  &__faq {
    margin-top: 32px;

    &-title {
      padding: 20px 0 8px;
    }

    &-subtitle {
      margin-bottom: 8px;
    }

    &-description {
      font-family: $font-family-base;
      font-size: $body-mobile-size;
      line-height: $bread-mobile-lh;
      margin-bottom: 16px;
    }

    &-list {
      display: flex;
      flex-direction: column;
    }
  }

  &__time {
    font-family: $font-family-base;
    font-size: $body-mobile-size;
    font-weight: $font-weight-regular;
    color: $color-text-light;
    white-space: nowrap;
  }

  &__role {
    font-family: $font-family-base;
    font-size: $bread-mobile-size;
    line-height: $bread-mobile-lh;
    font-weight: $font-weight-regular;
    color: $color-text-light;
  }
}
</style>
