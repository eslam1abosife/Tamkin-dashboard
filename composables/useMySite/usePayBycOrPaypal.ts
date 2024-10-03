import { useProfileStore } from './../../stores/profile';
import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const mysitestore = useMySiteStore()
const codeStatus = ref('')
const messageData = ref('')
    const payaddsite = async (card,type,redirectTo : any) => {
        try {
            const res = await api.post('/Apps/post/AppsInvouce',{
                "urls":  mysitestore.packagePayload.urls.filter((website: any) => website.url !== null)
                .map((website: any) => website.url) ,
                "apps": mysitestore.packagePayload.apps,
                "packageName":  mysitestore.currentPackage.name,
                "payDateType": mysitestore.packagePayload.payDateType === 0 ? 0 :mysitestore.packagePayload.payDateType,//1,3,12
                "pay_type": type,//Card|paypal
                "card": mysitestore.packagePayload.payDateType === 0 ? "" : card,//Allow Null
                "coupon_code": mysitestore.promo || null,//Allow Null
                "locale": redirectTo ? ( useNuxtApp().$i18n.locale.value === 'en' ? redirectTo+'?locale='+useNuxtApp().$i18n.locale.value : '/'+useNuxtApp().$i18n.locale.value+redirectTo+'?locale='+useNuxtApp().$i18n.locale.value) : null,
              "packageExtraType": mysitestore.packagePayload.packageExtraType,
           "packageTrie" : mysitestore.packagePayload.packageTrie,
           "upgrade":mysitestore.updatePayment
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