


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





// import axios from 'axios';
// import Cookies from 'js-cookie'; // Assuming you still need cookies for CSRF

//     // Function to retrieve token from session storage
//     const getAuthToken = () => {
//     const session = window.sessionStorage.getItem('authToken');
//     if (session) {
//         return JSON.parse(session); // Parse the stored token (optional if stored as string)
//     }
//     return null;
//     };

//     async function makeApiRequest(url, method, data = {}) {
//         const token = Cookies.get('authToken');
//         const headers = token ? { Authorization: `Bearer ${token}` } : {};
//         return axios({
//             url,
//             method,
//             data,
//             headers,
//         });
//     }
//     makeApiRequest(url, 'get')
//     .then(response => {
//         // Handle successful response
//     })
//     .catch(error => {
//         if (error.response && error.response.status === 401) {
//             // Token likely invalid or tampered with
//             alert('Authentication failed. Please log in again.');
//             Cookies.remove('auth_token');
//             // Redirect user to login page or handle logout logic
//         } else {
//             // Handle other errors
//         }
//     });
//     axios.interceptors.request.use(config => {
//     const token = getAuthToken();  // Use getAuthToken function

//     // Check for both CSRF token (from cookies) and auth token (from session storage)
//     if (token && Cookies.get('XSRF-TOKEN')) {
//         config.headers.Authorization = `Bearer ${token}`;
//         config.headers['X-CSRFToken'] = Cookies.get('XSRF-TOKEN'); // Set CSRF token header
//     }

//     return config;
//     }, error => {
//     return Promise.reject(error);
//     });

    

//     export default axios;
