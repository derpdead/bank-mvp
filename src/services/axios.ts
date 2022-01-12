import axios from 'axios';
import Router from 'next/router';

const instance = axios.create({
    withCredentials: false,
});

instance.interceptors.request.use(request => {

    return request;
}, error => {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    response => {
        return response;
    }, error => {

        if (error.response.status === 401 && typeof window !== 'undefined') {
            Router.push('/login');
        }

        return Promise.reject(error);
    });

export default instance;
