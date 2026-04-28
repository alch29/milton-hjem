<script setup>
import { useTimelineStore } from '@/stores/timeline';
import { onMounted } from 'vue';
import Button from '@/components/Button.vue';
import { useFormatDate } from '@/composables/useFormatDate';

const { formatDate } = useFormatDate();
const store = useTimelineStore();
onMounted(() => store.fetchTimeline());

defineProps({ item: Object });
defineEmits(['close']);
</script>

<template>
    <div class="timeline-card">
        <div class="timeline-card__container">
            <div class="timeline-card__header">
                <h3>{{ item.title }}</h3>
                <h3>{{ formatDate(item.date) }}</h3>
            </div>
            <p>{{ item.description }}</p>
            <Button 
                variant="cta-secondary" 
                @click="$emit('close')"
                class="timeline-card__button"
            >
                Luk
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
.timeline-card {
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
    display: flex;
    align-items: center;
    justify-content: center;

    &__container {
        margin: 24px;
        padding: 24px;
        background-color: $color-white;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }

    &__header {
        display: flex;
        justify-content: space-between;
    }

    &__button {
        align-self: center;
    }
}
</style>