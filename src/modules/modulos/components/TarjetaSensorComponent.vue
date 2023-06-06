<template>
    <article class="p-4 rounded-sm" :class="sensor.dato.color">
        <h3 class="uppercase text-slate-300 font-bold">
            <i class="fa-solid fa-wifi"></i> {{ sensor.clave }}
        </h3>
        <p class="uppercase text-slate-300 font-bold text-2xl">
            {{ sensor.dato.valor }}%
        </p>
        <p class="uppercase text-slate-300">
            estatus: <span class="font-bold">{{ sensor.dato.estado }}</span>
        </p>
    </article>
</template>

<script setup>
const props = defineProps({
    sensor: {
        type: Object,
        required: true
    }
});
</script>