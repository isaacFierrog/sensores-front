import service from "../../../service/service";


const recurso = 'login/';


export default {
    list(params){
        return service.get(recurso, { params })
    },
    retrieve(id, params){
        return service.get(`${recurso}${id}/`, { params })
    },
    autenticar(data){
        return service.post(recurso, data)
    },
    actualizar(data){
        return service.patch(`${recurso}refresh/`, data)
    }
}