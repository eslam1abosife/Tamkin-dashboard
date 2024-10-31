import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { ref } from 'vue';

export default function() {
    const { useApiInstance } = useApi();
    const { api } = useApiInstance();
    const loading = ref(false); // Global loading state
    const { $toast } = useNuxtApp();
    const translateStore = useTranslateStore();
    const codeStatus = ref('');
    const messageData = ref('');
    const projects = ref([]); // This stores all the projects
    const currentPage = ref(1); // Initial page number
    const pageSize = ref(5); // Number of records to load per request
    const allLoaded = ref(false); // Track if all records are loaded
    const loadMoreProjectsLoading = ref(false); // Track loading for load more button

    // Fetch projects function
    const getProjects = async (type, agency, reset = false) => {
        try {
            // Reset pagination if reset is true
            if (reset) {
                currentPage.value = 1; // Reset to first page
                translateStore.projectsAr = []; // Clear the projects array
                allLoaded.value = false; // Reset allLoaded flag
            }

            if (!loadMoreProjectsLoading.value) {
                loading.value = true; // Start global loading
            }

            const res = await api.post('/SignLanguage/GetPrjectList', {
                "where": {
                    "agency": agency,
                    "type": type
                },
                "PgNo": currentPage.value,
                "PgSize": pageSize.value
            });

            if (res && res.data && res.data.data) {
                const responseData = res.data.data; 
                const newRecords = responseData.data; 
                const hasNextPage = responseData.hasNextPage;
                const pagesCount = responseData.pagesCount;

                // Check if new records are returned
                if (newRecords.length > 0) {
                    // Concatenate new records to the existing projects array
                    translateStore.projectsAr = translateStore.projectsAr.concat(newRecords);
                    projects.value = translateStore.projectsAr; // Update local projects array

                    // Increment the current page for the next request only if there are more pages
                    if (currentPage.value < pagesCount) {
                        currentPage.value += 1;
                    } else {
                        allLoaded.value = true; // No more pages to load
                    }
                } else {
                    allLoaded.value = true; // No records were returned, set this to true
                }
            }

            // Set code and message status
            codeStatus.value = res.data.statusCode;
            messageData.value = res.data.message;

            // If it's the first load and no records were returned, set allLoaded to true
            if (currentPage.value === 1 && (!res.data.data || res.data.data.data.length === 0)) {
                allLoaded.value = true; // Set this to true if initial load returns zero records
            }
            translateStore.videoCount = res.data.data.videoCount
            translateStore.liveCount = res.data.data.liveCount
            translateStore.audioCount = res.data.data.aduioCount
            translateStore.pdfCount = res.data.data.pdfCount
            translateStore.docxCount = res.data.data.docxCount
            translateStore.photoscount = res.data.data.imagesCount
            translateStore.loadingProjects= false
            return translateStore.projectsAr; 
        } catch (error) {
            console.error("Error fetching projects:", error);
            throw new Error(typeof error === 'string' ? error : 'Something went wrong.');
        } finally {
            loading.value = false; // End global loading
        }
    };

    // Load more projects function for pagination
    const loadMoreProjects = async (type, agency) => {
        if (allLoaded.value || loadMoreProjectsLoading.value) {
            return; // Stop if all records are loaded or loading more projects is in progress
        }

        loadMoreProjectsLoading.value = true; // Start the loading for load more button

        try {
            await getProjects(type, agency); // Fetch the next page of projects
        } finally {
            loadMoreProjectsLoading.value = false; // End the loading for load more button
        }
    };

    return {
        getProjects,
        loadMoreProjects,
        projects,
        loading,
        codeStatus,
        messageData,
        allLoaded,
        loadMoreProjectsLoading
    }; 
}
