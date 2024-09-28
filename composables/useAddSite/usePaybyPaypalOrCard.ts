import { useProfileStore } from './../../stores/profile';
import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const addSiteStore = useAddSiteStore()
const codeStatus = ref('')
const messageData = ref('')
    const payaddsite = async (card,type,redirectTo : any) => {
        try {
            const res = await api.post('/Apps/post/AppsInvouce',{
                "urls":  addSiteStore.packagePayload.urls.filter((website: any) => website.url !== null)
                .map((website: any) => website.url) ,
                "apps": addSiteStore.packagePayload.apps,
                "packageName":  addSiteStore.currentPackage.name,
                "payDateType": addSiteStore.packagePayload.payDateType === 0 ? 0 :addSiteStore.packagePayload.payDateType,//1,3,12
                "pay_type": type,//Card|paypal
                "card": card,//Allow Null
                "coupon_code": addSiteStore.promo || null,//Allow Null
                "locale": redirectTo ? ( useNuxtApp().$i18n.locale.value === 'en' ? redirectTo+'?locale='+useNuxtApp().$i18n.locale.value : '/'+useNuxtApp().$i18n.locale.value+redirectTo+'?locale='+useNuxtApp().$i18n.locale.value) : null,
              "packageExtraType": addSiteStore.packagePayload.packageExtraType,
           "packageTrie" : addSiteStore.packagePayload.packageTrie
            });
            // packagesStore.packagePayload.apps .filter((website: any) => website.app_domain !== null) .map(app=>app.name)
            codeStatus.value = res.data.statusCode
            messageData.value = res.data.message
            return res.data.data
        } catch (error) {
            console.log(error);
            
        }
    };

    return {
        payaddsite,
        loading,
        messageData,
        codeStatus
    }
}