import { ref } from 'vue'
import { onMounted } from 'vue'
import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode';

const ls = localStorage;

export default defineStore('auth', () => {
    //State
    const accessToken = ref(
        ls.getItem('access')
    );
    const refreshToken = ref(
        ls.getItem('refresh')
    );
    const usuarioAutenticado = ref(
        JSON.parse(ls.getItem('usuario'))
    );
    const rolUsuario = ref(
        JSON.parse(ls.getItem('usuario'))?.rol
    )
    const cargando = ref(false);
    
    //Actions
    const obtenerDatosSesion = () => {}
    const sesionCaducada = () => {
        const tiempoActual = Math.floor(Date.now() / 1000);
        const tiempoExpiracion = jwtDecode(accessToken.value).exp;

        return tiempoActual > tiempoExpiracion;
    }
    const guardarDatos = datosUsuario => {
        asignarDatosSesion(datosUsuario);
        guardarDatosStorage(datosUsuario);
    }
    const guardarDatosStorage = ({ usuario, access, refresh }) => {
        ls.setItem('access', access);
        ls.setItem('refresh', refresh);
        ls.setItem('usuario', JSON.stringify(usuario));
    }
    const asignarDatosSesion = ({ usuario, access, refresh }) => {
        accessToken.value = access;
        refreshToken.value = refresh;
        usuarioAutenticado.value = usuario;
    }   
    const reiniciarDatosAuth = () => {
        usuarioAutenticado.value = null;
        accessToken.value = null;
        refreshToken.value = null;
    }
    
    //Logica
    onMounted(() => {
        if(sesionCaducada()) reiniciarDatosAuth();
    })

    return {
        //state
        cargando,
        rolUsuario,
        usuarioAutenticado,

        //actions
        guardarDatos,
        reiniciarDatosAuth,
    }
})