<template>
    <div>
        <Subtitulo :estilos-sub="estilosSub">
            <template #subtitulo>
                <span class="text-3xl">{{ moduloMac }}</span>
            </template>
            <template #imagen>
                <i class="fa-solid fa-layer-group"></i>
            </template>
        </Subtitulo>
        <article class="my-5 p-4 pb-6 bg-slate-800 rounded-lg">
            <NGrid :x-gap="12" :y-gap="12" :cols="4">
                <NGi>
                    <article>
                        <p class="uppercase text-slate-200 font-bold">fecha</p>
                        <NDatePicker type="date" :clearable="true"/>
                    </article>
                </NGi>
            </NGrid>
        </article>
        <section>
            <NGrid :x-gap="12" :y-gap="12" :cols="3">
                <NGi :span="2">
                    <section class="">
                        <template v-if="haySensores">
                            <template v-if="sensoresData?.some?.(({ data }) => data.length)">
                                <Line 
                                    :options="graficaOpciones"
                                    :data="graficaData"/>
                            </template>
                            <template v-else>
                                <article class="mt-48 text-center text-slate-300 text-6xl">
                                    <i class="fa-solid fa-ban mb-5 text-9xl"></i>
                                    <h2 class="uppercase font-bold">
                                        sin datos registrados
                                    </h2>
                                </article>
                            </template>
                        </template>
                        <template v-else>
                            <article class="mt-60 text-center text-slate-300 text-6xl">
                                <i class="fa-solid fa-ban mb-5 text-9xl"></i>
                                <h2 class="uppercase font-bold">
                                    sin sensores
                                </h2>
                            </article>
                        </template>
                    </section>
                </NGi>
                <NGi>
                    <NGrid :x-gap="12" :y-gap="12" :cols="2"> 
                        <NGi v-for="sensor in sensoresTarjetas"
                            :key="sensor">
                            <TarjetaSensor :sensor="sensor"/>
                        </NGi>
                    </NGrid>
                </NGi>
            </NGrid>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { NDatePicker } from 'naive-ui'
import { NGrid, NGi } from 'naive-ui'
import { Line } from 'vue-chartjs'
import 'chart.js/auto'
import modulosService from '../service/modulosService';


//Components
const Subtitulo = defineAsyncComponent(
    () => import('../../global/components/SubtituloComponent.vue')
);
const TarjetaSensor = defineAsyncComponent(
    () => import('../components/TarjetaSensorComponent.vue')
);

const route = useRoute();

//Data
const TIEMPO_ACTUALIZACION = 10_000;
const modulo = ref({
    mac: null,
    mina: null,
    area: null,
});
const filtroFecha = ref(null);
const refActualizacion = ref(null);
const moduloSensores = ref([]);
const graficaOpciones = ref({
    responsive: true
});

//Metodos
const asignarDatosModulo = ({ mac, mina, area, sensores }) => {
    modulo.value.mac = mac;
    modulo.value.mina = mina;
    modulo.value.area = area;
    moduloSensores.value = sensores;
}
const obtenerModulo = async() => {
    try{
        const res = (await modulosService.retrieve(route.params.id)).data;
        console.log('Modulo solicitado');
        console.log(res);
        asignarDatosModulo(res);
    }catch(err){
        console.log(err);
    }
}

//Propiedades computadas
const moduloMac = computed(() => modulo.value.mac);
const moduloMina = computed(() => modulo.value.mina);
const moduloArea = computed(() => modulo.value.area);
const haySensores = computed(() => moduloSensores.value.length > 0);
const estilosSub = computed(() => [
    'text-slate-200'
])
const sensoresEtiquetas = computed(() => moduloSensores.value.length
    ? moduloSensores.value[0].datos.map(({ fecha_creacion }) => 
        new Date(fecha_creacion).toLocaleTimeString()
    )
    : []
);
const sensoresData = computed(() => moduloSensores.value.length
    ? moduloSensores.value.map(({ clave, datos }) => ({
        label: clave,
        data: datos.map(({ valor }) => valor)
    }))
    : []
)
const sensoresTarjetas = computed(() => moduloSensores.value.length
    ? moduloSensores.value.map(({ clave, datos}) => {
        return {
            clave,
            dato: datos.length 
                ? {
                    valor: datos[datos.length - 1].valor,
                    estado: datos[datos.length - 1].estado
                        ? 'activado'
                        : 'desactivado',
                    color: {
                        'bg-teal-600': datos[datos.length - 1].estado,
                        'bg-red-700': !datos[datos.length - 1].estado
                    }
                }
                : {
                    valor: null,
                    estado: 'sin medicion',
                    color: ['bg-slate-500']
                }
        }
    })
    : []
);
const graficaData = computed(() => ({
    labels: sensoresEtiquetas.value,
    datasets: sensoresData.value
}));

//Logica
onMounted(() => {
    refActualizacion.value = setInterval(() => {
        obtenerModulo();
    }, TIEMPO_ACTUALIZACION);

    obtenerModulo();
});

onUnmounted(() => {
    console.log('SALIMOS DEL COMPONENTE');
    clearInterval(refActualizacion.value);
})
</script>