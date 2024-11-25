import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';


export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const subsStore = useSubsStore()
    const messageData = ref('')
const codeStatus = ref(0)
const renewAllCardorPaypal = async (card, type, hash = null, amount = null,code = null) => {
    try {
      const payload = {
        payment_type: type,
        card: card,
        "locale":"/subscriptions?locale="+useNuxtApp().$i18n.locale.value,
        promo_code:    subsStore.validPromo ? subsStore.promo : null

      };
  
      if (type === 'crypto') {
        payload.cryptoinput = {
          code: code || null,
          hash: hash || null,
          crypto: subsStore.selectedCrypto.name,
          network: subsStore.selectedCrypto.network,
          date: amount ? new Date() : null,
          amount: amount || null,
        };
      }
  
      const res = await api.post('/Packages/RenewAgencyPackages', payload);
  
      messageData.value = res.data.message ? res.data.message : 'Please try again later or contact support';
      codeStatus.value = res.data.statusCode;
  
      return res.data.data;
    } catch (error) {
      throw typeof error === 'string' ? error : 'There is something wrong';
    }
  };
  

    


    return {
        loading,
        renewAllCardorPaypal,
        messageData,
        codeStatus
    }
}