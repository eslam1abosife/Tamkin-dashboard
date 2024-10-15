import { useProfileStore } from './../../stores/profile';
import { useApi } from "@/composables/useApi";

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const packagesStore = usePackgesStore()
const codeStatus = ref('')
const messageData = ref('')
    const paybycorpaypal = async (card,type,redirectTo : any) => {
        try {
            const res = await api.post('/Apps/post/AppsInvouce',{
                "urls":  packagesStore.packagePayload.urls.filter((website: any) => website.url !== null).map((website: any) => website.url) ,
                "apps": packagesStore.packagePayload.apps,
                "packageName":  packagesStore.currentPackage.name,
                "payDateType": packagesStore.packagePayload.payDateType === 'trial' ? 1 :packagesStore.packagePayload.payDateType,//1,3,12
                "pay_type": type,//Card|paypal
                "card": packagesStore.packagePayload.payDateType === 'trial' ? "" : card,//Allow Null
                "coupon_code": packagesStore.promo || null,//Allow Null
                "locale": redirectTo ? ( useNuxtApp().$i18n.locale.value === 'en' ? redirectTo+'?locale='+useNuxtApp().$i18n.locale.value : '/'+useNuxtApp().$i18n.locale.value+'/'+redirectTo+'?locale='+useNuxtApp().$i18n.locale.value) : null,
              "packageExtraType": packagesStore.packagePayload.packageExtraType,
           "packageTrie" : packagesStore.packagePayload.packageTrie,
           "upgrade":false
            });
            // packagesStore.packagePayload.apps .filter((website: any) => website.app_domain !== null) .map(app=>app.name)
            codeStatus.value = res.data.statusCode
            messageData.value = res.data.message
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        paybycorpaypal,
        loading,
        messageData,
        codeStatus
    }
}