<script setup>
import Card from '@/components/cardComponents/Card.vue';

</script>

<template>
  <Card class="card__category">
    <template #icon><img src="@/assets/icons/Photo.svg"></template>
    <template #content>Noget tekst</template>
    <template #meta>dato</template>
  </Card>
  <Card class="card__standard card--meeting">
    <template #content>Noget tekst</template>
    <template #meta>dato</template>
  </Card>
</template>