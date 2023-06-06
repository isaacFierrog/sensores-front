import service from "../../../service/service";


const recurso = 'modulos/';


export default {
    list(params){
        return service.get(recurso, { params })
    },
    retrieve(id, params){
        return service.get(`${recurso}${id}/`, { params })
    },
    create(data){
        return service.post(recurso, data)
    },
    update(id, data){
        return service.patch(`${recurso}${id}/`, data)
    }
}