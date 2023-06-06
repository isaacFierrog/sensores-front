import { ref } from 'vue'
import { defineStore } from 'pinia'

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
    
    //Actions
    const obtenerDatosSesion = () => {}
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

    return {
        //state
        usuarioAutenticado,

        //actions
        guardarDatos,
    }
})