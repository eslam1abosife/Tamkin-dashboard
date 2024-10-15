import {useApi} from "@/composables/useApi";
import {useNuxtApp} from '#app';

const summaryCode = ref([]);
const detailedCode = ref([]);
const loading = ref(false);

export default function () {
    const {useApiInstance} = useApi();
    const {api} = useApiInstance();
    const {$toast} = useNuxtApp();

    const decodeHtmlEntities = (input) => {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = input;
        return textArea.value;
    };

    const cleanUpCode = (input) => {
        return input.replace(/[\r\n]+/g, '').trim(); // Removes line breaks and trims spaces
    };

    const getSummaryDetailedCode = async () => {
        loading.value = true;

        try {
            // Send both requests concurrently
            const [summaryRes, detailedRes] = await Promise.all([
                api.post('/mySite/GetSummaryCode'),
                api.post('/mySite/GetDetailedCode')
            ]);

            if (!summaryRes.data.succeeded) throw(summaryRes.data.message);
            // Perform URL decode, then HTML decode, then clean up
            const urlSummaryDecodedString = decodeURIComponent(summaryRes.data.data);
            summaryCode.value = cleanUpCode(decodeHtmlEntities(urlSummaryDecodedString));  // Clean up here

            if (!detailedRes.data.succeeded) throw(detailedRes.data.message);
            // Perform URL decode, then HTML decode, then clean up
            const urlDecodedDecodedString = decodeURIComponent(detailedRes.data.data);
            detailedCode.value = decodeHtmlEntities(urlDecodedDecodedString);  // Clean up here

        } catch (error) {
            throw typeof (error) === 'string' ? error : 'There is something wrong';
        } finally {
            loading.value = false;
        }
    };

    return {
        getSummaryDetailedCode,
        summaryCode,
        detailedCode,
        loading
    };
}
