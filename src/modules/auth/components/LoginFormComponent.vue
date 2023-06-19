<template>
    <div class="flex flex-col justify-center items-center w-full -mt-16">
        <article class="w-2/5 px-8 py-6 bg-cyan-950 border-t-8 border-t-cyan-600 rounded-lg shadow-sm">
            <article class="mb-3">
                <p class="mb-1 uppercase font-bold text-slate-200">correo</p>
                <NInput
                    v-model:value="usuario.correo"
                    size="large"
                    :clearable="true"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase font-bold text-slate-200">password</p>
                <NInput
                    v-model:value="usuario.password"
                    type="password"
                    size="large"
                    show-password-on="click"
                    :clearable="true"/>
            </article>
            <section class="text-right">
                <NButton
                    :size="'large'"
                    type="info"
                    @click="loginUsuario">
                    Ingresar
                </NButton>
            </section>
        </article>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { NForm, NFormItem } from 'naive-ui'
import { NInput, NButton } from 'naive-ui'
import useAuthStore from '../store/useAuthStore'
import authService from '../service/authService'
import useNotificaciones from '@/modules/global/composable/useNotificaciones'


const router = useRouter();
const authStore = useAuthStore();
const notificaciones = useNotificaciones();

//Data
const usuario = ref({
    correo: null,
    password: null
})

//Metodos 
const loginUsuario = async() => {
    if(!camposLlenos.value){
        notificaciones.notificacion('warning', {
            content: 'Debes de ingresar todos los datos',
            meta: 'Necesitas llentar todos los campos para ingresar',
        })
        return;
    }
    
    try{
        const res = (await authService.autenticar(usuario.value)).data;
        notificaciones.notificacion('success', {
            content: 'Exito',
            meta: 'Inicio de sesion exitosa'
        })

        router.push({ name: 'modulos-listado' });
        authStore.guardarDatos(res);
    }catch(err){
        console.log(err);
        notificaciones.notificacion('error', {
            content: 'Error de autenticacion',
            meta: 'Las credenciales ingresadas no son correctas',
        })
    }
}

//Propiedades computadas
const camposLlenos = computed(() => {
    for(const clave in usuario.value){
        if(usuario.value[clave] === null) return false;
    }
    return true;
})
</script>