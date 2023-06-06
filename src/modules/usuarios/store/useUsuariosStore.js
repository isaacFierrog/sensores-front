import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import usuariosService from '../service/usuariosService';


export default defineStore('usuarios', () => {
    //Store
    const usuario = ref({
        correo: null,
        nombre: null,
        apellido: null,
        mina: null,
        area: null,
        password: null,
        rol: null
    });
    const usuarioId = ref(null);
    const usuarioCrear = ref(false);
    const usuarioEditar = ref(false);
    const usuarioMostrar = ref(false);
    const usuarioActualizar = ref(false);
    const passwordEditar = ref(false);
    const verificacionPassword = ref(null);
    const modalUsuario = ref(false);
    const modalConfirmarEliminar = ref(false);

    //Actions
    const mostrarDatosUsuario = () => usuarioMostrar.value = true;
    const editarDatosUsuario = () => usuarioEditar.value = true;
    const crearDatosUsuario = () => usuarioCrear.value = true;
    const mostrarModalConfirmar = () => modalConfirmarEliminar.value = true;
    const ocultarModalConfirmar = () => modalConfirmarEliminar.value = false;
    const mostrarModalUsuario = () => modalUsuario.value = true;
    const ocultarModalUsuario = () => modalUsuario.value = false;
    const actualizarUsuarios = () => usuarioActualizar.value = true;

    const asignarDatosUsuario = ({ apellido, area, rol, correo, mina, nombre, id }) => {
        usuario.value.correo = correo;
        usuario.value.nombre = nombre;
        usuario.value.apellido = apellido;
        usuario.value.mina = mina;
        usuario.value.area = area;
        usuario.value.rol = rol;
        usuarioId.value = id;
    }
    const reiniciarDatosUsuario = () => {
        for(const clave in usuario.value){
            usuario.value[clave] = null;
        }
        usuarioId.value = null;
        usuarioCrear.value = false;
        usuarioMostrar.value = false;
        usuarioEditar.value = false;
        usuarioActualizar.value = false;
        passwordEditar.value = false;
    }

    const obtenerUsuario = async(idUsuario) => {
        const res = (await usuariosService.retrieve(idUsuario)).data;
        asignarDatosUsuario(res);
    }

    //Getters
    const passwordCorrecto = computed(() => {
        if(!usuario.value.password && !verificacionPassword.value) return false;
        return usuario.value.password === verificacionPassword.value;
    })
    const camposLlenos = computed(() => {
        for(const clave in usuario.value){
            if(usuario.value[clave] === null) return false;
        }

        return true;
    });
    const usuarioNombre = computed(() => {
        const nombre = `${usuario.value.nombre} ${usuario.value.apellido}`
            .toUpperCase();
        
        return nombre.length >= 17
            ? `${nombre.slice(0, 17)} . . .`
            : nombre;
    });
    const crearDatos = computed(() => usuarioCrear.value);
    const mostrarDatos = computed(() => usuarioMostrar.value);
    const editarDatos = computed(() => usuarioEditar.value);

    //Logica
    watch(modalUsuario, newValue => {
        if(!newValue) reiniciarDatosUsuario();
    })
    
    return {
        //store
        usuario,
        usuarioId,
        usuarioActualizar,
        verificacionPassword,
        modalUsuario,
        modalConfirmarEliminar,
        passwordEditar,

        //actions
        mostrarModalUsuario,
        ocultarModalUsuario,
        obtenerUsuario,
        mostrarDatosUsuario,
        mostrarModalConfirmar,
        ocultarModalConfirmar,
        editarDatosUsuario,
        crearDatosUsuario,
        actualizarUsuarios,

        //getters
        passwordCorrecto,
        camposLlenos,
        mostrarDatos,
        editarDatos,
        crearDatos,
        usuarioNombre,
    }
});