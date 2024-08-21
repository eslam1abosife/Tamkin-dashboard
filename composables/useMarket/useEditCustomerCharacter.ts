import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

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
            return{
                data:res
            }
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        EditCustomCharacter,
        loading,
    }
}