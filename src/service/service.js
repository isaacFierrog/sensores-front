import axios from 'axios'
import jwtDecode from 'jwt-decode';
import router from '../router';


const baseURL = 'http://127.0.0.1:8000/api/';
// const baseURL = 'http://189.173.80.163:8000/api/';
const ls = localStorage;
const urlLogin = 'login/';
const instance = axios.create({
    baseURL,
});


instance.interceptors.request.use(
    async(request) => {
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

        const { access } = (await axios.post(`${baseURL}login/refresh/`, {
            refresh: ls.getItem('refresh')
        })).data;
        
        ls.setItem('access', access);
        request.headers.Authorization = `Bearer ${access}`;
        
        return request;
    },
    err => Promise.reject(err)
);

instance.interceptors.response.use(
    res => res,
    err => {
        if(err.response.status === 401){
            ls.clear();
            router.push({ name: 'auth-login' });
        }else{
            return Promise.reject(err)
        }
    }
);


export default instance;