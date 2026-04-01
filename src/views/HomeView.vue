<script setup>
import Card from '@/components/cardComponents/Card.vue';
import CardContactInfo from '@/components/cardComponents/CardContactInfo.vue';

</script>

<template>
  <Card class="card--category">
    <template #icon><img src="@/assets/icons/Photo.svg"></template>
    <template #content>Noget tekst</template>
    <template #meta>dato</template>
  </Card>
  <Card class="card--meeting">
    <template #content>Noget tekst</template>
    <template #meta>dato</template>
  </Card>
  <CardContactInfo>
    <template #user-name>Navn og efternavn</template>
    <template #contact-info>Telefon nummer og adresse</template>
  </CardContactInfo>
</template>