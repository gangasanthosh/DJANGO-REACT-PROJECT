


    import axios from 'axios';
import Cookies from 'js-cookie'; // Assuming you still need cookies for CSRF

    // Function to retrieve token from session storage
    const getAuthToken = () => {
    const session = window.sessionStorage.getItem('authToken');
    if (session) {
        return JSON.parse(session); // Parse the stored token (optional if stored as string)
    }
    return null;
    };



    axios.interceptors.request.use(config => {
    const token = getAuthToken();  // Use getAuthToken function

    // Check for both CSRF token (from cookies) and auth token (from session storage)
    if (token && Cookies.get('XSRF-TOKEN')) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['X-CSRFToken'] = Cookies.get('XSRF-TOKEN'); // Set CSRF token header
    }

    return config;
    }, error => {
    return Promise.reject(error);
    });

    

    export default axios;

