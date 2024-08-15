import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();

    const editMember = async (state) => {
        try {
            const res = await api.post('/Team/EditMember', {
                data: {
                    first_name: state.first_name,
                    last_nmae: state.last_name,
                    email: state.member_email
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        editMember,
        loading
    }
}