import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const notificationBellStore = useNotificationBellStore();


    const getNotification = async () => {
        try {
            const res = await api.post('/Notification/Get',{});

            console.log(' All Notification res *>>>>>>*',res.data.data);
            notificationBellStore.notifications = res.data.data; // Store notifications in the store
            } catch (error) {
            console.error(error);
            $toast.error(typeof error === 'string' ? error : 'There was an issue fetching notifications.');
        }
    };

    return {
        getNotification,
        loading
    }
}
