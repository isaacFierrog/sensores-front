<template>
    <div class="w-full h-screen flex flex-col justify-center items-center">
        <img src="../../../assets/img/Promev.png" class="w-1/4 -mt-20">
        <LoginForm/>
    </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

//Componentes
const LoginForm = defineAsyncComponent(
    () => import('../components/LoginFormComponent.vue')
)
</script>