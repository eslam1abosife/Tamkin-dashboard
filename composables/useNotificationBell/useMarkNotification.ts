import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const notificationBellStore = useNotificationBellStore();


    const markNotification = async (value) => {
        try {
            let res = null;

            if (value == "all"){
                 res = await api.post('/Notification/Mark',{
                    "uid": "all"
                });
                // console.log('mark All Notification res *>>>>>>*',res.data.data);
            }else {
                console.log('value',value)
                 res = await api.post('/Notification/Mark',{
                    "uid": value
                });
                console.log('mark  Notification res *>>>>>>*',res.data.data);
            }


            // notificationBellStore.notifications = res.data.data; // Store notifications in the store
            } catch (error) {
            console.error(error);
            // $toast.error(typeof error === 'string' ? error : 'There was an issue mark notifications.');
        }
    };

    return {
        markNotification,
        loading
    }
}
