import axios from 'axios';

export const useApi = () => {
    const config = useRuntimeConfig();

    const instance = axios.create({
        baseURL: config.public.baseURL,
        headers: {
            Authorization: `Bearer my token`
        }
    });

    // Add a request interceptor
    instance.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            console.log('Request sent:', config);
            return config;
        },
        function (error) {
            // Do something with request error
            console.error('Request error (request interceptor):', error);
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    instance.interceptors.response.use(
        function (response) {
            // Do something with response data
            console.log('Response received:', response);
            return response;
        },
        function (error) {
            // Do something with response error
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response error (response interceptor):', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.error('No response received (response interceptor):', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error (response interceptor):', error.message);
            }
            return Promise.reject(error);
        }
    );

    return instance;
};
