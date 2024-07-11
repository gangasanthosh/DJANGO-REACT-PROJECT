


    import axios from 'axios';
import Cookies from 'js-cookie';

    const getAuthToken = () => {
    const session = window.sessionStorage.getItem('authToken');
    if (session) {
        return JSON.parse(session); 
    }
    return null;
    };



    axios.interceptors.request.use(config => {
    const token = getAuthToken();  

    if (token && Cookies.get('XSRF-TOKEN')) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['X-CSRFToken'] = Cookies.get('XSRF-TOKEN'); 
    }

    return config;
    }, error => {
    return Promise.reject(error);
    });

    

    export default axios;

