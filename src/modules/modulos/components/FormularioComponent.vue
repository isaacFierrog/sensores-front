<template>
    <NModal v-model:show="modulosStore.modalModulo">
        <NCard :style="estilosModal">
            <h2 class="uppercase font-bold text-xl">
                Formulario de modulos
            </h2>
            <hr class="my-3">
            <section>
                <article class="mb-3">
                    <p class="uppercase font-bold">mac</p>
                    <NInput
                        v-model:value="modulosStore.modulo.mac"/>
                </article>
                <article class="mb-3">
                    <p class="uppercase font-bold">mina</p>
                    <NInput
                        v-model:value="modulosStore.modulo.mina"/>
                </article>
                <article class="mb-3">
                    <p class="uppercase font-bold">area</p>
                    <NInput
                        v-model:value="modulosStore.modulo.area"/>
                </article>
                <template v-if="modulosStore.camposLlenos">
                    <article class="flex justify-between items-center mb-3">
                        <NButton 
                            type="info" 
                            :ghost="false" 
                            :circle="true" 
                            class="flex justify-center items-center"
                            @click="modulosStore.eliminarSensor">
                            <p class="text-2xl">-</p>
                        </NButton>
                        <p>{{ modulosStore.numeroSensores }}</p>
                        <NButton 
                            type="info" 
                            :ghost="false" 
                            :circle="true" 
                            class="flex justify-center items-center"
                            @click="modulosStore.agregarSensor">
                            <p class="text-2xl">+</p>
                        </NButton>
                    </article>
                </template>
            </section>
            <footer class="flex justify-end">
                <NButton 
                    type="info" 
                    :ghost="false"
                    @click="crearModulo">
                    Crear modulo
                </NButton>
            </footer>
        </NCard>
    </NModal>
</template>

<script setup>
import { computed } from 'vue'
import { NInput, NButton } from 'naive-ui'
import { NModal, NCard } from 'naive-ui'
import { useNotification } from 'naive-ui'
import modulosService from '../service/modulosService';
import useModulosStore from '../store/useModulosStore';


const modulosStore = useModulosStore();
const notification = useNotification();

//Metodos
const crearModulo = async() => {
    if(!modulosStore.camposLlenos){
        notification.error({
            duration: 2500,
            content: 'Campos vacios',
            meta: 'Debe de llenar todos los campos para crear un usuario',
            keepAliveOnHover: true
        }); 
        return;
    };

    try{
        const res = (await modulosService.create(modulosStore.modulo)).data;
        console.log('RESPUESTA DE CREAR MODULO');
        console.log(res);
        modulosStore.actualizarModulos();
        modulosStore.ocultarModalModulo();

        notification.success({
            duration: 2500,
            content: 'registro exitoso',
            meta: 'Se ha creado el modulo de forma exitosa',
            keepAliveOnHover: true
        })
    }catch(err){
        console.log(err);
        notification.error({
            duration: 2500,
            content: 'ocurrio un error',
            meta: 'El registro no se ha podido crear',
            keepAliveOnHover: true
        })
    }
}

//Propiedades computadas
const estilosModal = computed(() => ({
    width: '30%'
}))
</script>
