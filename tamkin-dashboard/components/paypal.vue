<template>
  <div>
    <div v-show="!loading" ref="btn"></div>
    <div v-show="loading" class="flex justify-between mb-4 gap-2">
      <div
        class="animate-pulse mb-2 w-[70%] h-[35px] bg-gray-300 dark:bg-gray-600 rounded"
      ></div>
      <div
        class="animate-pulse mb-2 w-[25%] h-[35px] bg-gray-300 dark:bg-gray-600 rounded"
      ></div>
    </div>
    <div
      v-show="loading"
      class="animate-pulse mb-2 w-[30%] h-[35px] bg-gray-300 dark:bg-gray-600 rounded"
    ></div>
    <div v-show="loading" class="flex justify-between w-full">
      <div
        class="animate-pulse mb-2 w-[30%] h-[35px] bg-gray-300 dark:bg-gray-600 rounded"
      ></div>
      <div
        class="animate-pulse mb-2 w-[25%] h-[35px] bg-gray-300 dark:bg-gray-600 rounded"
      ></div>
    </div>
    <div
      v-show="loading"
      class="animate-pulse mb-2 w-full h-[35px] bg-gray-300 dark:bg-gray-600 rounded"
    ></div>
  </div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";
import { usePaymentStore } from "@/stores/payment";
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
    const paymentStore = usePaymentStore();
    const loadPayPalButton = async () => {
      try {
        paymentStore.setLoadingPaypal(true);
        const paypal = await loadScript({
          "client-id":
            "AX-2rQp0cxxu4_UqtnE5PNLcpNinAEZoqTNgaCFWaIrjReJVWhdUDNW3HFzn9pAba7KGGpYK9INIf1R0",
        });

        if (!paypal) {
          console.error("Error Download PayPal SDK.");
          paymentStore.setLoadingPaypal(false);
          return;
        }

        paypal
          .Buttons({
            fundingSource: paypal.FUNDING.PAYPAL,
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },

            createOrder: async () => {
              const res = await props.clickPay();
              const id = res.clientsecret;
              return id;
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                loading.value = true;
                paymentStore.setLoadingPaypal(true);
                setTimeout(() => {
                  loading.value = false;
                  props.successPay();
                  paymentStore.setLoadingPaypal(false);
                }, 21000);
              });
            },
            onError: (err) => {
              console.error("Error Payment:", err);
              props.errorPay();
              paymentStore.setLoadingPaypal(false);
            },
            onCancel: () => {
              props.errorPay();
              paymentStore.setLoadingPaypal(false);
            },
          })
          .render(btn.value);

        loading.value = false;
        paymentStore.setLoadingPaypal(false);
      } catch (error) {
        console.error("Error Download PayPal SDK:", error);
        paymentStore.setLoadingPaypal(false);
      }
    };

    onMounted(() => {
      loadPayPalButton();
    });

    return {
      loading,
      btn,
      paymentStore,
    };
  },
};
</script>
