<script setup>
import Card from '@/components/cardComponents/Card.vue';
import CardContactInfo from '@/components/cardComponents/CardContactInfo.vue';
import CardImageCategory from '@/components/cardComponents/CardImageCategory.vue';
import CardNotifications from '@/components/cardComponents/CardNotifications.vue';

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
    <template #image><img src="@/assets/images/LivogMalthe.jpg"></template>
    <template #user-name>Navn og efternavn</template>
    <template #contact-info>Telefon nummer og adresse</template>
  </CardContactInfo>
  <CardImageCategory>
    <template #title>Vægge</template>
    <template #meta>25/07/26</template>
    <template #image><img src="@/assets/images/gulvvarme.jpg"></template>
    <template #image-count>2</template>
  </CardImageCategory>
  <CardNotifications>
    
  </CardNotifications>
</template>