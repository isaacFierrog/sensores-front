<template>
    <div>
        <TemplateListado>
            <template #cabecera>
                <Subtitulo :estilos-sub="estilosSub">
                    <template #subtitulo>
                        Modulos
                    </template>
                    <template #imagen>
                        <i class="fa-solid fa-layer-group"></i>
                    </template>
                </Subtitulo>
                <NButton 
                    :type="'info'" 
                    :ghost="false">
                    <span class="uppercase font-bold"
                        @click="modulosStore.mostrarModalModulo">
                        + crear modulo
                    </span>
                </NButton>
            </template>
            <template #filtros>
                <NGrid :x-gap="12" :y-gap="12" :cols="3">
                    <NGi>
                        <article>
                            <p class="uppercase text-slate-200 font-bold">mac</p>
                            <NInput
                                v-model:value="filtroMac"
                                placeholder="Buscar modulo por mac"
                                @keypress.enter="obtenerModulos"/>
                        </article>
                    </NGi>
                    <NGi>
                        <article>
                            <p class="uppercase text-slate-200 font-bold">mina</p>
                            <NInput
                                v-model:value="filtroMina"
                                placeholder="Buscar modulos por mina"
                                @keypress.enter="obtenerModulos"/>
                        </article>
                    </NGi>
                    <NGi>
                        <article>
                            <p class="uppercase text-slate-200 font-bold">area</p>
                            <NInput
                                v-model:value="filtroArea"
                                placeholder="Buscar modulos por area"
                                @keypress.enter="obtenerModulos"/>
                        </article>
                    </NGi>
                </NGrid>
            </template>
            <template #listado>
                <NGrid :x-gap="12" :y-gap="12" :cols="4">
                    <NGi v-for="modulo in listadoModulos"
                        :key="modulo">
                        <Modulo :modulo="modulo"/>
                    </NGi>
                    <NGi :span="4">
                        <footer class="flex justify-center items-center">
                            <NPagination v-model:page="filtroPagina" :page-count="numeroPaginas"/>
                        </footer>
                    </NGi>
                </NGrid>
            </template>
        </TemplateListado>
        <FormularioModulo/>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { NButton, NInput, NPagination } from 'naive-ui'
import { NGrid, NGi } from 'naive-ui'
import modulosService from '../service/modulosService'
import useModulosStore from '../store/useModulosStore'


//Components
const Subtitulo = defineAsyncComponent(
    () => import('../../global/components/SubtituloComponent.vue')
);
const Modulo = defineAsyncComponent(
    () => import('../components/ModuloComponent.vue')
);
const FormularioModulo = defineAsyncComponent(
    () => import('../components/FormularioComponent.vue')
);
const TemplateListado = defineAsyncComponent(
    () => import('../../global/components/TemplateListadoComponent.vue')
)

const modulosStore = useModulosStore();

//Data
const listadoModulos = ref([]);
const numeroPaginas = ref(null);
const filtroPagina = ref(null);
const filtroMac = ref(null);
const filtroMina = ref(null);
const filtroArea = ref(null);

//Metodos
const reiniciarFiltros = () => {
    filtroMac.value = null;
    filtroMina.value = null;
    filtroArea.value = null;
}
const obtenerModulos = async() => {
    try{
        const res = (await modulosService.list({
            mac: filtroMac.value,
            mina: !filtroMac.value ? filtroMina.value : null,
            area: !filtroMac.value ? filtroArea.value : null,
            page: filtroPagina.value
        })).data;    

        if(res.next) 
            numeroPaginas.value = parseInt(res.next.split('=')[1]);
        
        listadoModulos.value = res.results;
        reiniciarFiltros();

        console.log('RESPUESTA DE MODULOS');
        console.log(res.next.split('='));

        console.log('LISTADO DE MODULOS')
        console.log(listadoModulos.value);

    }catch(err){
        console.log(err);
    }
}

//Propiedades computadas
const estilosSub = computed(() => [
    'text-slate-200'
])

//Logica
const { moduloActualizar } = storeToRefs(modulosStore);

onMounted(() => {
    obtenerModulos();
})

watch(moduloActualizar, newValue => {
    if(newValue) obtenerModulos();
})

watch(filtroPagina, newValue => {
    obtenerModulos();
});
</script>