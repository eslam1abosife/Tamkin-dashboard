<template>
    <div>
        <div ref="btn">
        </div>
    </div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";

export default {
    props: {
        amount: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            default: "USD",
        },
        successPay: {
            type: Function,
            required: true,
        },
        errorPay: {
            type: Function,
            required: true,
        }
    },
    setup(props) {
        const loading = ref(true);
        const btn = ref(null);

        const loadPayPalButton = async () => {
            try {
                const paypal = await loadScript({
                    "client-id": 'AX-2rQp0cxxu4_UqtnE5PNLcpNinAEZoqTNgaCFWaIrjReJVWhdUDNW3HFzn9pAba7KGGpYK9INIf1R0',
                    currency: props.currency,
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

                    createOrder: (data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: props.amount,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: (data, actions) => {
                        return actions.order.capture().then((details) => {
                            props.successPay();
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