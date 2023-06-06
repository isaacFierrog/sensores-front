<template>
  <section class="w-full h-screen bg-slate-900">
    <n-notification-provider>
      <div class="w-11/12 mx-auto">
        <HeaderComponent :rutas="listadoRutas" v-if="authStore.usuarioAutenticado">
          <template #logo>
            <img src="./assets/img/Promev.png" class="w-1/6 -ml-7">
          </template>
        </HeaderComponent>

        <router-view></router-view>
      </div>
    </n-notification-provider>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NNotificationProvider } from 'naive-ui'
import useAuthStore from './modules/auth/store/useAuthStore';


//Components
const HeaderComponent = defineAsyncComponent(
  () => import('./modules/global/components/HeaderComponent.vue')
);

const authStore = useAuthStore();

//Data
const listadoRutas = ref([
  {
    nombre: 'modulos',
    ruta: { name: 'modulos-listado' }
  },
  {
    nombre: 'usuarios',
    ruta: { name: 'usuarios-listado' }
  },
]);
</script>
