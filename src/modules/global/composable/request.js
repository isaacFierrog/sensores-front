import { ref, computed } from 'vue'

const service = ref(null);

export default (serviceModulo=null) => {
    service.value ??= serviceModulo; 

    //Metodos
    const obtenerElementos = async(params=null) => {
        try{
            const res = await serviceModulo.list(params);
            console.log('OBTENER ELEMENTOS');
            console.log(res);
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    const obtenerElemento = async(id, params=null) => {
        try{
            const res = await serviceModulo.retrieve(id, params);
            console.log('OBTENER ELEMENTO');
            console.log(res);
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    const crearElemento = async(data) => {
        try{
            const res = await serviceModulo.create(data);
            console.log('CREAR ELEMENTO')
            console.log(res);
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    const editarElemento = async(id, data) => {
        try{
            const res = await serviceModulo.update(id, data);
            console.log('EDITAR ELEMENTO');
            console.log(res)
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    //FUNCIONES HTTP PERSONALIZADAS
    const obtenerElementosA = async(serviceM, params=null) => {
        try{
            const res = await serviceM.list(params);
            console.log('OBTENER ELEMENTOS');
            console.log(res);
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    const obtenerElementoA = async(serviceM, id, params=null) => {
        try{
            const res = await serviceM.retrieve(id, params);
            console.log('OBTENER ELEMENTO');
            console.log(res);
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    const crearElementoA = async(serviceM, data) => {
        try{
            const res = await serviceM.create(data);
            console.log('CREAR ELEMENTO')
            console.log(res);
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }
    const editarElementoA = async(serviceM, id, data) => {
        try{
            const res = await serviceM.update(id, data);
            console.log('EDITAR ELEMENTO');
            console.log(res)
            return res;
        }catch(err){
            console.log(err);
            throw err;
        }
    }

    //Propiedades computadas
    return {
        //Metodos
        //FUNCIONES HTTP
        obtenerElemento,
        obtenerElementos,
        crearElemento, 
        editarElemento,

        //FUNCIONES HTTP PERSONALIZADAS
        obtenerElementoA,
        obtenerElementosA,
        crearElementoA,
        editarElementoA,
    }
}