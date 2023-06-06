<template>
    <article class="flex items-center uppercase font-bold text-2xl" :class="estilosSub">
        <h2 class="mr-3">
            <slot name="subtitulo"></slot>
        </h2>
        <slot name="imagen"></slot>
    </article>
</template>

<script setup>
const props = defineProps({
    estilosSub: {
        type: Array,
    }
})
</script>