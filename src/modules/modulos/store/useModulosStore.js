import { ref, computed, watch, toRefs } from 'vue'
import { defineStore } from 'pinia'
import modulosService from '../service/modulosService';


export default defineStore('modulos', () => {
    //Store
    const modulo = ref({
        mac: null,
        mina: null,
        area: null,
        sensores: []
    });
    const moduloId = ref(null);
    const moduloActualizar = ref(false);
    const modalModulo = ref(false);

    //Actions
    const mostrarModalModulo = () => modalModulo.value = true;
    const ocultarModalModulo = () => modalModulo.value = false;

    const actualizarModulos = () => moduloActualizar.value = true;
    const reiniciarDatosModulo = () => {
        for(const clave in modulo.value){
            modulo.value[clave] = null;
        }
        modulo.value.sensores = [];
        moduloActualizar.value = false;
    }
    const agregarSensor = () => {
        const indexSensor = modulo.value.sensores.length + 1;
        modulo.value.sensores.push({
            clave: `${modulo.value.mac}-${indexSensor}`
        });
    }
    const eliminarSensor = () => {
        if(!modulo.value.sensores.length) return;

        const indexSensor = modulo.value.sensores.length - 1;
        modulo.value.sensores.splice(indexSensor, 1);
    }
    const asignarDatosModulo = ({ area, mac, mina, id }) => {
        modulo.value.area = area;
        modulo.value.mac = mac;
        modulo.value.mina = mina;
        moduloId.value = id;
    }

    const obtenerModulo = async(idModulo) => {
        const res = await modulosService.retrieve(idModulo);
        asignarDatosModulo(res);
    }

    //Getters
    const numeroSensores = computed(() => modulo.value.sensores.length);
    const camposLlenos = computed(() => {
        for(const clave in modulo.value){
            if(modulo.value[clave] === null) return false;
        }

        return true;
    })

    //Logica
    const { mac } = toRefs(modulo.value);

    watch(mac, newValue => {
        if(!newValue) reiniciarDatosModulo();
    });

    watch(modalModulo, newValue => {
        if(!newValue) reiniciarDatosModulo();
    });

    return {
        //state
        modulo,
        moduloActualizar,
        modalModulo,

        //actions
        mostrarModalModulo,
        ocultarModalModulo,
        actualizarModulos,
        agregarSensor,
        eliminarSensor,

        //getters
        numeroSensores,
        camposLlenos
    }
});