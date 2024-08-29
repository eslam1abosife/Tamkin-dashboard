import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

const customCharacterCost = ref(null);

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const GetCustomCharacterCost = async () => {
        try {
            const res = await api.post('/Market/GetCustomCharacterCost');
            if(!res.data.succeeded) throw(res.data.message);
            customCharacterCost.value = res.data.data;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };
    const EditCustomCharacter = async (state) => {
        try {
            const res = await api.post('/Market/EditCustomCharacter', {
                data: {
                    id: state.id,
                    name: state.name,
                    age: state.age,
                    gender: state.gender,
                    description:state.description,
                    images:state.images,
                    delted_images: state.delted_images || []
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            return{
                data:res
            }
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        EditCustomCharacter,
        GetCustomCharacterCost,
        customCharacterCost,
        loading,
    }
}