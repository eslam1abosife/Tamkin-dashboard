<!-- StripeCard.vue -->
<template>
    <div            class="w-full relative rtl:!font-[Almarai] ltr:!font-[Poppins]"

    >
        <div id="card-number-element" class="w-full input_floating_label "></div>
        <div id="card-errors" class="error_message !bottom-[55px] z-[40]" ></div>
   
  
      <div class="flex items-center justify-center mt-[14px] w-full  space-x-[20px] rtl:space-x-reverse">

        <div class="w-2/4 ">
          <div id="card-cvc-element" class="w-full input_floating_label "></div>
          <div id="cvc-errors" class="error_message">{{ cvcError }}</div>
        </div>
        <div class="w-2/4">
          <div id="card-expiry-element" class="w-full input_floating_label "></div>
          <div id="expiry-errors" class="error_message">{{ expiryError }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  import { ref, onMounted } from 'vue';
  
  export default {
    props: {
      stripeKey: {
        type: String,
        required: true,
      },
      cardOptions: {
        type: Object,
        default: () => ({}),
      },
    },
    emits: ['paymentMethodCreated'], // Add emit event
    setup(props, { emit }) {
      const stripe = ref(null);
      const elements = ref(null);
      const cardNumberElement = ref(null);
      const cvcElement = ref(null);
      const expiryElement = ref(null);
      const cvcError = ref('');
      const expiryError = ref('');
  
      onMounted(async () => {
        stripe.value = await loadStripe(props.stripeKey);
        elements.value = stripe.value.elements();
  
        // Create and mount Card Number Element
        cardNumberElement.value = elements.value.create('cardNumber', props.cardOptions);
        cardNumberElement.value.mount('#card-number-element');
  
        // Create and mount CVC Element
        cvcElement.value = elements.value.create('cardCvc', props.cardOptions);
        cvcElement.value.mount('#card-cvc-element');
  
        // Create and mount Expiry Element
        expiryElement.value = elements.value.create('cardExpiry', props.cardOptions);
        expiryElement.value.mount('#card-expiry-element');
  
        // Handle changes for card number
        cardNumberElement.value.on('change', (event) => {
          const errorElement = document.getElementById('card-errors');
          if (event.error) {
            errorElement.textContent = event.error.message;
          } else {
            errorElement.textContent = '';
          }
        });
      });
  
      const handleSave = async () => {
        if (!stripe.value || !elements.value) return;
  
        const { error, paymentMethod } = await stripe.value.createPaymentMethod({
          type: 'card',
          card: cardNumberElement.value,
          billing_details: {
            // Replace with actual billing details
            name: 'Test User',
            email: 'test@example.com',
          },
        });
  
        if (error) {
          console.error('Error creating payment method:', error);
        } else {
          // Emit the payment method to the parent component
          emit('paymentMethodCreated', paymentMethod);
        }
      };
  
      return {
        cardNumberElement,
        cvcElement,
        expiryElement,
        cvcError,
        expiryError,
        handleSave, // Make this available to the template if needed
      };
    },
  };
  </script>