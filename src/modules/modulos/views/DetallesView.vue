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
                        <NDatePicker 
                            type="date" 
                            :clearable="true"
                            v-model:value="filtroFecha"
                            @update-value="obtenerDatosFecha"/>
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
import datosService from '../service/datosService'


//Components
const Subtitulo = defineAsyncComponent(
    () => import('../../global/components/SubtituloComponent.vue')
);
const TarjetaSensor = defineAsyncComponent(
    () => import('../components/TarjetaSensorComponent.vue')
);

const route = useRoute();

//Data
const FECHA_ACTUAL = new Date();
const FECHA_SUPERIOR = new Date(
    new Date().setDate(FECHA_ACTUAL.getDate() + 1)
);
const TIEMPO_ACTUALIZACION = 10_000;
const modulo = ref({
    mac: null,
    mina: null,
    area: null,
});
const filtroFecha = ref(null);
const refActualizacion = ref(null);
const moduloSensores = ref([]);
const nuevosDatos = ref([]);
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
const obtenerModulo = async(idModulo, params) => {
    try{
        const res = (await modulosService.retrieve(idModulo, params)).data;
        console.log('Modulo solicitado');
        console.log(res);
        asignarDatosModulo(res);
    }catch(err){
        console.log(err);
    }
}
const obtenerDatos = async(params) => {
    try{
        const res = (await datosService.list(params)).data;
        console.log('DATOS DEL MODULO OBTENIDO');
        console.log(res);
        nuevosDatos.value = res.results;
    }catch(err){
        console.log(err);
    }
}
const obtenerDatosFecha = value => {
    console.log('DATOS DEL MODULO');
    console.log(moduloSensores.value);


    const fechaActual = new Date(value);
    const fechaSuperior = new Date(
        new Date().setDate(fechaActual.getDate() + 1)
    )

    clearInterval(refActualizacion.value);
    obtenerDatos({
        modulo: moduloMac.value,
        fecha_inicio: fechaActual
            .toLocaleDateString()
            .split('/')
            .reverse()
            .join('-'),
        fecha_final: fechaSuperior
            .toLocaleDateString()
            .split('/')
            .reverse()
            .join('-'),
    });
    refActualizacion.value = setInterval(() => {
        obtenerDatos({
            modulo: moduloMac.value,
            fecha_inicio: fechaActual
                .toLocaleDateString()
                .split('/')
                .reverse()
                .join('-'),
            fecha_final: fechaSuperior
                .toLocaleDateString()
                .split('/')
                .reverse()
                .join('-'),
        });
    }, TIEMPO_ACTUALIZACION);
}

//Propiedades computadas
const moduloMac = computed(() => modulo.value.mac);
const moduloMina = computed(() => modulo.value.mina);
const moduloArea = computed(() => modulo.value.area);
const haySensores = computed(() => datosModulo.value.length > 0);
const estilosSub = computed(() => [
    'text-slate-200'
])
const sensoresEtiquetas = computed(() => datosModulo.value.length
    ? datosModulo.value[0].datos.map(({ fecha_creacion }) => 
        new Date(fecha_creacion).toLocaleTimeString()
    )
    : []
);
const sensoresData = computed(() => datosModulo.value.length
    ? datosModulo.value.map(({ clave, datos }) => ({
        label: clave,
        data: datos.map(({ valor }) => valor)
    }))
    : []
)
const sensoresTarjetas = computed(() => datosModulo.value.length
    ? datosModulo.value.map(({ clave, datos}) => {
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
const fechaSelccionada = computed(() => {
    if(filtroFecha.value){
        return new Date(filtroFecha.value).toLocaleDateString().replaceAll('/', '-');
    }

    return null;
})
const datosModulo = computed(() => {
    if(nuevosDatos.value.length){
        return moduloSensores.value.map(sensor => {
            return {
                ...sensor,
                datos: nuevosDatos.value
                    .filter(({ sensor: sensorId }) => sensorId === sensor.id)
            }
        })
    }

    return moduloSensores.value
}); 
const fechaSuperior = computed(() => {
    if(filtroFecha.value){
        const fechaActual = new Date(filtroFecha.value);
        return fechaActual.setDate(fechaActual.getDate() + 1).toLocaleDateString().replaceAll('/', '-');
    }

    return null
})

//Logica
onMounted(() => {
    refActualizacion.value = setInterval(() => {
        obtenerDatos({
            modulo: moduloMac.value,
            fecha_inicio: FECHA_ACTUAL.toLocaleDateString()
                .split('/')
                .reverse()
                .join('-'),
            fecha_final: FECHA_SUPERIOR.toLocaleDateString()
                .split('/')
                .reverse()
                .join('-')
        });
    }, TIEMPO_ACTUALIZACION);

    obtenerModulo(route.params.id);
    obtenerDatos({
        modulo: moduloMac.value,
        fecha_inicio: FECHA_ACTUAL.toLocaleDateString()
            .split('/')
            .reverse()
            .join('-'),
        fecha_final: FECHA_SUPERIOR.toLocaleDateString()
            .split('/')
            .reverse()
            .join('-')
    });
});

onUnmounted(() => {
    console.log('SALIMOS DEL COMPONENTE');
    clearInterval(refActualizacion.value);
})
</script>