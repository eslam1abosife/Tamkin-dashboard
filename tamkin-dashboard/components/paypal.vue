<template>
    <div>
        <div v-show="!loading" ref="btn">
        </div>
        <div v-show="loading" class="animate-pulse w-full h-[55px] bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";
export default {
    props: {
        successPay: {
            type: Function,
            required: true,
        },
        errorPay: {
            type: Function,
            required: true,
        },
        clickPay: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const loading = ref(true);
        const btn = ref(null);

        const loadPayPalButton = async () => {
            try {
                const paypal = await loadScript({
                    "client-id": 'AX-2rQp0cxxu4_UqtnE5PNLcpNinAEZoqTNgaCFWaIrjReJVWhdUDNW3HFzn9pAba7KGGpYK9INIf1R0',
                });

                if (!paypal) {
                    console.error("Error Download PayPal SDK.");
                    return;
                }

                paypal.Buttons({
                    fundingSource: paypal.FUNDING.PAYPAL,
                    style: {
                        layout: 'vertical',
                        color: 'blue',
                        shape: 'rect',
                        label: 'paypal'
                    },

                    createOrder: async () => {
                        const res = await props.clickPay();
                        const id = res.clientsecret;
                        return id;
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then((details) => {
                            loading.value = true;
                            setTimeout(() => {
                                loading.value = false;
                                props.successPay();
                            }, 5000);
                        });
                    },
                    onError: (err) => {
                        console.error("Error Payment:", err);
                        props.errorPay();
                    },
                }).render(btn.value);

                loading.value = false;
            } catch (error) {
                console.error("Error Download PayPal SDK:", error);
            }
        };

        onMounted(() => {
            loadPayPalButton();
        });

        return {
            loading,
            btn,
        };
    },
};
</script>
