<template>
    <article class="p-4 bg-slate-700 rounded-sm">
        <h2 class="text-3xl uppercase font-bold text-slate-100">
            {{ moduloMac }}
        </h2>
        <section class="mt-3 mb-5">
            <p class="text-slate-400">
                <i class="fa-solid fa-industry"></i>
                <span class="ml-2 uppercase">
                    mina: {{ moduloMina }}
                </span>
            </p>
            <p class="text-slate-400">
                <i class="fa-solid fa-toolbox"></i>
                <span class="ml-2 uppercase">
                    area: {{ moduloArea }}
                </span>
            </p>
            <p class="text-slate-400">
                <i class="fa-solid fa-wifi"></i>
                <span class="ml-1 uppercase">
                    sensores: {{ moduloSensores }}
                </span>
            </p>
        </section>
        <footer class="flex justify-between items-center bg-slate-300 rounded-xl" @click="hola">
            <article class="flex flex-col justify-center items-center p-4 flex-grow hover:cursor-pointer hover:bg-red-400/30">
                <i class="fa-solid fa-trash"></i>
                <p>eliminar</p>
            </article>
            <article class="flex flex-col justify-center items-center p-4 flex-grow hover:cursor-pointer hover:bg-amber-400/30">
                <i class="fa-solid fa-pencil"></i>
                <p>editar</p>
            </article>
            <article class="flex flex-col justify-center items-center p-4 flex-grow hover:cursor-pointer hover:bg-cyan-400/30"
                @click="mostrarDetallesModulo">
                <i class="fa-solid fa-eye"></i>
                <p>ver</p>
            </article>
        </footer>
    </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

//Props
const props = defineProps({
    modulo: {
        type: Object,
        required: true
    }
});

const router = useRouter();

//Data

//Metodos
const mostrarDetallesModulo = () => {
    router.push({
        name: 'modulos-detalle',
        params: {
            id: props.modulo.id
        }
    });
};

// const eliminarModulo = () => {
//     usuariosStore.mostrarModalConfirmar();
//     usuariosStore.obtenerUsuario(props.usuario.id);
// };

// const editarModulo = () => {
//     usuariosStore.editarDatosUsuario();
//     usuariosStore.obtenerUsuario(props.usuario.id);
//     usuariosStore.mostrarModalUsuario();
// };

//Propiedades computadas
const moduloMac = computed(() => props.modulo.mac.toUpperCase());
const moduloMina = computed(() => props.modulo.mina.toUpperCase());
const moduloArea = computed(() => props.modulo.area.toUpperCase());
const moduloSensores = computed(() => props.modulo.sensores.length)
</script>