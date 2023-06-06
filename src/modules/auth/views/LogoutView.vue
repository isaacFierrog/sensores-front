<template>
    
</template>

<script setup>
import { useRouter } from 'vue-router'
import useAuthStore from '../store/useAuthStore';


const router = useRouter();
const authStore = useAuthStore();

localStorage.clear();
authStore.reiniciarDatosAuth();
router.push({ name: 'auth-login' })
</script>