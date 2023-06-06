<template>
    <article class="p-4 bg-slate-700 rounded-sm"> 
        <h2 class="text-3xl uppercase font-bold text-slate-100">
            {{ usuarioNombre }}
        </h2>
        <section class="mt-3 mb-5">
            <p class="text-slate-400">
                <i class="fa-solid fa-industry"></i>
                <span class="ml-2 uppercase">
                    mina: {{ usuarioMina }}
                </span>
            </p>
            <p class="text-slate-400">
                <i class="fa-solid fa-toolbox"></i>
                <span class="ml-2 uppercase">
                    area: {{ usuarioArea }}
                </span>
            </p>
            <p class="text-slate-400">
                <i class="fa-solid fa-circle-user"></i>
                <span class="ml-2 uppercase">
                    rol: {{ usuarioRol }}
                </span>
            </p>
        </section>
        <footer class="flex justify-between items-center bg-slate-300 rounded-xl" @click="hola">
            <article class="flex flex-col justify-center items-center p-4 flex-grow hover:cursor-pointer hover:bg-red-400/30"
                @click="eliminarUsuario">
                <i class="fa-solid fa-trash"></i>
                <p>eliminar</p>
            </article>
            <article class="flex flex-col justify-center items-center p-4 flex-grow hover:cursor-pointer hover:bg-amber-400/30"
                @click="editarUsuario">
                <i class="fa-solid fa-pencil"></i>
                <p>editar</p>
            </article>
            <article class="flex flex-col justify-center items-center p-4 flex-grow hover:cursor-pointer hover:bg-cyan-400/30"
                @click="mostrarDetallesUsuario">
                <i class="fa-solid fa-trash"></i>
                <p>ver</p>
            </article>
        </footer>
    </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import usuariosService from '../service/usuariosService';
import useUsuariosStore from '../store/useUsuariosStore';

//Props
const props = defineProps({
    usuario: {
        type: Object,
        required: true
    }
})

const usuariosStore = useUsuariosStore();

//Data
const ROLES = [
    {
        rol: 1,
        nombre: 'administrador'
    },
    {
        rol: 2,
        nombre: 'supervisor'
    },
    {
        rol: 1,
        nombre: 'operador'
    },
]

//Metodos
const mostrarDetallesUsuario = () => {
    usuariosStore.mostrarDatosUsuario();
    usuariosStore.obtenerUsuario(props.usuario.id);
    usuariosStore.mostrarModalUsuario();
};

const eliminarUsuario = () => {
    usuariosStore.mostrarModalConfirmar();
    usuariosStore.obtenerUsuario(props.usuario.id);
};

const editarUsuario = () => {
    usuariosStore.editarDatosUsuario();
    usuariosStore.obtenerUsuario(props.usuario.id);
    usuariosStore.mostrarModalUsuario();
};

//Propiedades computadas
const usuarioNombre = computed(() => {
    const nombre = `${props.usuario.nombre} ${props.usuario.apellido}`
        .toUpperCase();
    
    return nombre.length >= 17
        ? `${nombre.slice(0, 17)} . . .`
        : nombre;
});
const usuarioMina = computed(() => 
    props.usuario.mina?.toUpperCase?.() ?? 'sin asignar'
);
const usuarioArea = computed(() => 
    props.usuario.area?.toUpperCase?.() ?? 'sin asignar'
);
const usuarioRol = computed(() => props.usuario.rol
    ? ROLES.find(({ rol }) => rol === props.usuario.rol).nombre
    : ''
)
</script>