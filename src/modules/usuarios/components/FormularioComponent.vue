<template>
    <NModal v-model:show="usuariosStore.modalUsuario">
        <NCard :style="estilosModal">
            <h2 class="uppercase font-bold text-xl">
                Formulario de usuarios
            </h2>
            <hr class="my-3">
            <section>
                <article class="mb-3">
                    <p class="uppercase font-bold">correo</p>
                    <NInput
                        :readonly="usuariosStore.mostrarDatos"
                        v-model:value="usuariosStore.usuario.correo"/>
                </article>
                <article class="mb-3">
                    <p class="uppercase font-bold">nombre</p>
                    <NInput
                        :readonly="usuariosStore.mostrarDatos"
                        v-model:value="usuariosStore.usuario.nombre"/>
                </article>
                <article class="mb-3">
                    <p class="uppercase font-bold">apellido</p>
                    <NInput
                        :readonly="usuariosStore.mostrarDatos"
                        v-model:value="usuariosStore.usuario.apellido"/>
                </article>
                <article class="mb-3">
                    <p class="uppercase font-bold">mina</p>
                    <NInput
                        :readonly="usuariosStore.mostrarDatos"
                        v-model:value="usuariosStore.usuario.mina"/>
                </article>
                <article class="mb-3">
                    <p class="uppercase font-bold">area</p>
                    <NInput
                        :readonly="usuariosStore.mostrarDatos"
                        v-model:value="usuariosStore.usuario.area"/>
                </article>
                <article class="mb-3">
                    <p class="uppercase font-bold">rol</p>
                    <NSelect
                        v-model:value="usuariosStore.usuario.rol"
                        :disabled="usuariosStore.mostrarDatos"
                        :options="opcionesRoles"/>
                </article>
                <section v-if="usuariosStore.editarDatos" class="flex items-center justify-end my-3">
                    <p class="mr-3 uppercase">Editar contraseña</p>
                    <NSwitch v-model:value="usuariosStore.passwordEditar">
                        <template #checked>
                            SI
                        </template>
                        <template #unchecked>
                            NO
                        </template>
                    </NSwitch>
                </section>
                <template v-if="usuariosStore.crearDatos || (usuariosStore.editarDatos && usuariosStore.passwordEditar)">
                    <article class="mb-3">
                        <p class="uppercase font-bold">contraseña</p>
                        <NInput
                            type="password"
                            v-model:value="usuariosStore.usuario.password"/>
                    </article>
                    <article class="mb-3">
                        <p class="uppercase font-bold">confirmar contraseña</p>
                        <NInput
                            type="password"
                            v-model:value="usuariosStore.verificacionPassword"/>
                    </article>
                </template>
                <footer 
                    v-if="usuariosStore.editarDatos || usuariosStore.crearDatos" 
                    class="flex justify-end">
                    <template v-if="usuariosStore.editarDatos">
                        <NButton
                            @click="editarUsuario">
                            Editar usuario
                        </NButton>
                    </template>
                    <template v-else>
                        <NButton 
                            @click="crearUsuario">
                            Crear usuario
                        </NButton>
                    </template>
                </footer>
            </section>
        </NCard>
    </NModal>
</template>

<script setup>
import { computed } from 'vue';
import { defineAsyncComponent } from 'vue'
import { NCard, NModal } from 'naive-ui'
import { NInput, NButton, NSwitch, NSelect } from 'naive-ui'
import { useNotification } from 'naive-ui'
import useUsuariosStore from '../store/useUsuariosStore'
import usuariosService from '../service/usuariosService'


const usuariosStore = useUsuariosStore();
const notification = useNotification();

//Data


//Metodos
const editarUsuario = async() => {
    if(usuariosStore.passwordEditar){
        if(!usuariosStore.camposLlenos){
            notification.error({
                duration: 2500,
                content: 'Campos vacios',
                meta: 'Debe de llenar todos los campos para crear un usuario',
                keepAliveOnHover: true
            }); 
            return;
        }
        
        if(!usuariosStore.passwordCorrecto){
            notification.error({
                duration: 2500,
                content: 'Password incorrecto',
                meta: 'El password de verificacion no coincide',
                keepAliveOnHover: true
            }); 
            return;
        } 
    }else{
        delete usuariosStore.usuario.password;
    }

    try{
        const res = await usuariosService.update(
            usuariosStore.usuarioId,
            usuariosStore.usuario
        );
        usuariosStore.usuario['password'];
        usuariosStore.actualizarUsuarios();
        usuariosStore.ocultarModalUsuario();

        notification.success({
            duration: 2500,
            content: 'registro exitoso',
            meta: 'Se ha editado al usuario de forma exitosa',
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
const crearUsuario = async() => {
    if(!usuariosStore.camposLlenos){
        notification.error({
            duration: 2500,
            content: 'Campos vacios',
            meta: 'Debe de llenar todos los campos para crear un usuario',
            keepAliveOnHover: true
        }); 
        return;
    } 

    if(!usuariosStore.passwordCorrecto){
        notification.error({
            duration: 2500,
            content: 'Password incorrecto',
            meta: 'El password de verificacion no coincide',
            keepAliveOnHover: true
        }); 
        return;
    } 

    try{
        const res = await usuariosService.create(
            usuariosStore.usuario
        );
        usuariosStore.actualizarUsuarios();
        usuariosStore.ocultarModalUsuario();

        notification.success({
            duration: 2500,
            content: 'registro exitoso',
            meta: 'Se ha creado al usuario de forma exitosa',
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
const opcionesRoles = computed(() => [
    {
        label: 'administrador',
        value: 1
    },
    {
        label: 'supervisor',
        value: 2
    },
    {
        label: 'operador',
        value: 3
    },
])
const estilosModal = computed(() => ({
    width: '33.3%'
}))
</script>