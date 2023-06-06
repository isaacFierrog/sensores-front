import axios from 'axios'
import jwtDecode from 'jwt-decode';
import router from '../router';


const baseURL = 'http://127.0.0.1:8000/api/';
// const baseURL = '189.173.80.163:8000/api/';
const ls = localStorage;
const urlLogin = 'login/';
const instance = axios.create({
    baseURL,
});


instance.interceptors.request.use(
    async(request) => {
        //Obtener token de acceso
        let tiempoExpiracion;
        let tokenExpirado;
        const tokenAccess = ls.getItem('access');
        const tiempoActual = Math.floor(Date.now() / 1000);
        
        if(tokenAccess)
            request.headers['Authorization'] = `Bearer ${tokenAccess}`;

        if(request.url !== urlLogin){
            tiempoExpiracion = jwtDecode(tokenAccess).exp;
            tokenExpirado = tiempoActual > tiempoExpiracion;
        }

        if(!tokenExpirado) return request;

        const res = (await axios.post(`${baseURL}login/refresh/`, {
            refresh: ls.getItem('refresh')
        })).data;
        
        ls.setItem('access', res.access);
        request.headers.Authorization = `Bearer ${ls.getItem('access')}`;
        
        return request;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => {
        if(error.response && error.response.status === 401){
            ls.clear();
            router.push({ name: 'auth-login' })
        }
        return Promise.reject(error);
    }
);


export default instance;