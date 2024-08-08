import axios from "axios";

const BaseUrl = axios.create({
    baseURL : 'http://localhost:8000/api'
})

BaseUrl.interceptors.request.use(
    (config) => {
        if(!config.url.includes('/login')){
            const token = localStorage.getItem('token');
            if (token){
                config.headers['Content-Type']  = 'application/json'
                config.headers['Authorization'] = `Bearer ${token}`
            }
        }
        return config;

    },
    (error) => {
        return Promise.reject(error);
    }
)

export default BaseUrl