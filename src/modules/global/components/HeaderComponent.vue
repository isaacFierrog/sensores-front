<template>
    <header class="flex justify-between items-center">
        <slot name="logo">
            <h1>TITULO</h1>
        </slot>
        <nav>
        <router-link
            v-for="{ nombre, ruta } in rutas"
            :key="nombre"
            :to="ruta" 
            class="uppercase font-bold text-slate-200 text-xl px-2 py-6 last-of-type:pr-0 hover:border-b-2 hover:border-b-emerald-600">
            {{ nombre }}
        </router-link>
        </nav>
    </header>
</template>

<script setup>
const props = defineProps({
    rutas: {
        type: Array,
        required: true
    }
})
</script>