import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { ref } from 'vue';

export default function() {
    const { useApiInstance } = useApi();
    const { api } = useApiInstance();
    const loading = ref(false); // Global loading state
    const { $toast } = useNuxtApp();
    const codeStatus = ref('');
    const messageData = ref('');

const getProject = async (id) => {
    try {
        loading.value = true; 
        const res = await api.post('/SignLanguage/GetProject', {
            "name":id

        }); 
        if(res.data.data.project === null){
            return showError({
                statusCode: 404,
                statusMessage: "Project not found"
              })
        }
        return res.data.data;
    } catch (error) {

        throw typeof(error) === 'string' ? error : 'There is something wrong';
    }
 
}
return {
    getProject,
    loading,
    codeStatus,
    messageData,
}
}