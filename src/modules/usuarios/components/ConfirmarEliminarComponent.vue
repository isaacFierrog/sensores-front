<template>
    <NModal v-model:show="usuariosStore.modalConfirmarEliminar">
        <NCard :style="estilosModal">
            <h2 class="mb-3 text-xl">¿Desea eliminar al usuario {{ usuariosStore.usuarioNombre }}?</h2>
            <section>
                <NButton :type="'info'" :ghost="false" class="mr-3"
                    @click="usuariosStore.ocultarModalConfirmar">
                    <span class="uppercase">cancelar</span>
                </NButton>
                <NButton :type="'error'" :ghost="false">
                    <span class="uppercase">eliminar</span>
                </NButton>
            </section>
        </NCard>
    </NModal>
</template>

<script setup>
import { computed } from 'vue'
import { NButton } from 'naive-ui'
import { NModal, NCard } from 'naive-ui'
import useUsuariosStore from '../store/useUsuariosStore'
import usuariosService from '../service/usuariosService'

const usuariosStore = useUsuariosStore();

//Data

//Metodos
// const eliminarUsuario = async() => {
//     try{
//         const res = await usuariosService.
//     }catch(err){

//     }
// }

//Propiedades computadas
const estilosModal = computed(() => ({
    width: '33.3%'
}))
</script>