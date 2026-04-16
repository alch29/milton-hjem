<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  }
});
</script>

<template>
    <div 
    class="breadcrumb breadcrumbs"
    :class="[`breadcrumb--${variant}`]"
    >
        <img class="breadcrumb__image" src="../assets/icons/Arrow.svg">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
@use '@/assets/scss/typography' as *;
.breadcrumb {
    color: $color-text;
    display: flex;
    gap: 8px;

    &__image {
        width: 10px;
        transform: scale(-1);
    }

    &--secondary {
        background: $color-primary-light;
    }
}
</style>