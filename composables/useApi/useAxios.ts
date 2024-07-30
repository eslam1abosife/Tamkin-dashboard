import axios from 'axios';
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import useLoading from "@/composables/useApi/useLoading";

export default function() {
    const { showLoadingSpinner, hideLoadingSpinner } = useLoading();

    function useApiInstance() {
        const config = useRuntimeConfig();
        const loading = ref(false);
        const user = ref(null);

        // Check if running on the client side
        if (typeof window !== 'undefined') {
            user.value = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        }

        const instance = axios.create({
            baseURL: config.public.baseURL,
            headers: {
                Authorization: `Bearer ${user.value ? user.value.sid : null}`
            }
        });

        // Add a request interceptor
        instance.interceptors.request.use(
            function (config) {
                loading.value = true; // Set loading to true before request is sent
                showLoadingSpinner();
                console.log('Request sent:', config);
                return config;
            },
            function (error) {
                loading.value = false; // Set loading to false if request error occurs
                hideLoadingSpinner();
                console.error('Request error (request interceptor):', error);
                return Promise.reject(error);
            }
        );

        // Add a response interceptor
        instance.interceptors.response.use(
            function (response) {
                loading.value = false; // Set loading to false when response is received
                hideLoadingSpinner();
                console.log('Response received:', response);
                return response;
            },
            function (error) {
                loading.value = false; // Set loading to false if response error occurs
                hideLoadingSpinner();
                if (error.response) {
                    console.error('Response error (response interceptor):', error.response.data);
                    console.error('Status:', error.response.status);
                    console.error('Headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received (response interceptor):', error.request);
                } else {
                    console.error('Error (response interceptor):', error.message);
                }
                return Promise.reject(error);
            }
        );

        return {
            api: instance,
            loading
        };
    }

    return {
        useApiInstance
    };
};
