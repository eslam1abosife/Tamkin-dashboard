import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
const codeStatus = ref(``)
    const joinInvestor = async (investor) => {
        try {
            const res = await api.post('/Packages/InvestorJoin',{
                "package": investor.package, // name of package
                "wallet_address":investor.wallet,
                "crypto_currency": investor.currency, // name of Tamkin Crypto Tokens
                "transaction_hashes":investor.hashes,
                "app": investor.app,
                "amount": investor.amount
            });
            codeStatus.value = res.data.statusCode
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };
    const isInestorUser = async () => {
        try {
            const res = await api.post('/Packages/GetInvestorJoin',{
           
            });
            codeStatus.value = res.data.statusCode
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };
    return {
        joinInvestor,
        loading,
        codeStatus,
        isInestorUser
    }
}