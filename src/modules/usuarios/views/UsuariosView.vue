<template>
    <div>
        <TemplateListado>
            <template #cabecera>
                <Subtitulo :estilos-sub="estilosSub">
                    <template #subtitulo>
                        Usuarios
                    </template>
                    <template #imagen>
                        <i class="fa-solid fa-user"></i>
                    </template>
                </Subtitulo>
                <NButton 
                    :type="'info'" 
                    :ghost="false"
                    @click="mostrarModalUsuario">
                    <span class="uppercase font-bold">
                        + crear usuario
                    </span>
                </NButton>
            </template>
            <template #filtros>
                <NGrid :x-gap="12" :y-gap="12" :cols="3">
                    <NGi>
                        <article>
                            <p class="uppercase text-slate-200 font-bold">nombre usuario</p>
                            <NInput
                                @keypress.enter="obtenerUsuarios"
                                placeholder="Buscar por nombre de usuario"
                                v-model:value="filtroNombre"/>
                        </article>
                    </NGi>
                    <NGi>
                        <article>
                            <p class="uppercase text-slate-200 font-bold">mina</p>
                            <NInput
                                @keypress.enter="obtenerUsuarios"
                                placeholder="Buscar modulos por mina"
                                v-model:value="filtroMina"/>
                        </article>
                    </NGi>
                    <NGi>
                        <article>
                            <p class="uppercase text-slate-200 font-bold">area</p>
                            <NInput
                                @keypress.enter="obtenerUsuarios"
                                placeholder="Buscar modulos por area"
                                v-model:value="filtroArea"/>
                        </article>
                    </NGi>
                </NGrid>
            </template>
            <template #listado>
                <section>
                    <NGrid :x-gap="12" :y-gap="12" :cols="4">
                        <NGi 
                            v-for="usuario in listadoUsuarios"
                            :key="usuario">
                            <Usuario :usuario="usuario"/>
                        </NGi>
                    </NGrid>
                </section>
            </template>
        </TemplateListado>
        <FormularioUsuario/>
        <ConfirmarEliminar/>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { NButton, NInput } from 'naive-ui'
import { NGrid, NGi } from 'naive-ui'
import usuariosService from '../service/usuariosService'
import useUsuariosStore from '../store/useUsuariosStore'

//Componentes
const ConfirmarEliminar = defineAsyncComponent(
    () => import('../components/ConfirmarEliminarComponent.vue')
)
const FormularioUsuario = defineAsyncComponent(
    () => import('../components/FormularioComponent.vue')
)
const Subtitulo = defineAsyncComponent(
    () => import('../../global/components/SubtituloComponent.vue')
)
const Usuario = defineAsyncComponent(
    () => import('../components/UsuarioComponent.vue')
)
const TemplateListado = defineAsyncComponent(
    () => import('../../global/components/TemplateListadoComponent.vue')
)

const usuariosStore = useUsuariosStore();

//Data
const listadoUsuarios = ref([]);
const filtroNombre = ref(null);
const filtroMina = ref(null);
const filtroArea = ref(null);

//Metodos
const reiniciarFiltros = () => {
    filtroNombre.value = null;
    filtroMina.value = null;
    filtroArea.value = null;
}
const mostrarModalUsuario = () => {
    usuariosStore.crearDatosUsuario();
    usuariosStore.mostrarModalUsuario();
}

const obtenerUsuarios = async() => {
    try{
        const res = (await usuariosService.list({
            mina: filtroMina.value,
            area: filtroArea.value,
            nombre: filtroNombre.value
        })).data;
        listadoUsuarios.value = res.results;
        reiniciarFiltros();
        console.log('LISTADO DE USUARIOS');
        console.log(listadoUsuarios.value);
    }catch(err){
        console.log(err);
    }
}

//Propiedades computadas
const estilosSub = computed(() => [
    'text-slate-200'
])

//Logica
const { usuarioActualizar } = storeToRefs(usuariosStore);

onMounted(() => {
    obtenerUsuarios();
})

watch(usuarioActualizar, newValue => {
    if(newValue) obtenerUsuarios();
})
</script>