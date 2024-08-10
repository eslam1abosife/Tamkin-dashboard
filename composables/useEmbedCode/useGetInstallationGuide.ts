import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const installationGuide = ref([]);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getInstallationGuides = async () => {
        try {
            const res = await api.post('/Tamkin Install Guid/GET', {
                where: {},
                PgNo: 0,
                PgSize: 100
            });
            if(!res.data.succeeded) throw(res.data.message);
            installationGuide.value = res.data.data;
        } catch (error) {
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            })
            throw error;
        }
    };

    return {
        getInstallationGuides,
        installationGuide,
        loading
    }
}