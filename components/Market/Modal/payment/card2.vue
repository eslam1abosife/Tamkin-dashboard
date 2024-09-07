<script lang="ts" setup>
import { loadStripe } from '@stripe/stripe-js';
import { ref, onMounted } from 'vue';

const stripeKey = ref('pk_test_51PsNOm2M5zlGZwf5AZsxAxBBW65wE8IWHIHQMXGYfV3XbXAgGv1Ca3HMooFq2O9zcEfpQsk9baxN1ki6vnIca0ag00QCvJdwBM'); 
const stripeLoaded = ref(false);
const cardElement = ref(null);
let stripe = null;
let elements = null;

const cardErrors = ref(null);
const formSubmitted = async (event) => {
  event.preventDefault();

  const result = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement.value,
 
  });

  if (result.error) {
    cardErrors.value = result.error.message;
  } else {
    // The payment method was successfully created
    console.log('Payment Method ID:', result.paymentMethod.id);
    // Here, you can send result.paymentMethod.id to your backend
  }
};

onMounted(async () => {
  stripe = await loadStripe(stripeKey.value);
  elements = stripe.elements();

  cardElement.value = elements.create('card');
  cardElement.value.mount('#card-element');

  stripeLoaded.value = true;
});

</script>

<template>
  <div>
    <h2>Save Card</h2>
    <form id="payment-form" @submit="formSubmitted">
      <div id="card-element"></div>
      <div v-if="cardErrors" id="card-errors" role="alert">{{ cardErrors }}</div>
      <button type="submit" :disabled="!stripeLoaded">Save Card</button>
    </form>
  </div>
</template>
