<script setup lang="ts">
import { store } from "./store";
import Header from "./components/Header/Header.vue";
import ProductCard from "./components/ProductCard/ProductCard.vue";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";
import { product } from "./data/product";
const mockPayment = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/mock-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response: store.UPIResponse,
          price: product.productPrice,
        }),
      }
    );
    const paymentResponse = await response.json();
    store.setMockResponse(paymentResponse.data);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <Header msg="Vite + Vue" />
  <section class="page-hero">
    <div class="section-center">
      <h3 class="page-hero-title">
        Home <span class="title-slash">/</span> Products
      </h3>
    </div>
  </section>
  <section class="main-products">
    <section class="products-container products-container-center">
      <ProductCard />
      <div v-if="Object.keys(store.UPIResponse).length" class="response">
        <p>This is the response that you get from the upi-deep-links</p>
        <vue-json-pretty :data="store.UPIResponse" />
        <a
          :href="store?.UPIResponse?.paymentLink.shortURL"
          target="_blank"
          rel="noreferrer"
          class="sandbox-link"
        >
          Click here to pay using our sandbox
        </a>
        <p>
          As this is just a sandbox testing edition, Click the below mock
          payment button to mock the payment
        </p>

        <button
          @click="mockPayment"
          kind="tertiary"
          marginTop="nano"
          marginBottom="nano"
          class="btn btn-squared m-y"
        >
          Mock Payment
        </button>
        <div
          v-if="store.mockResponse && Object.keys(store.mockResponse).length"
        >
          <p>Response from mock payment</p>
          <vue-json-pretty :data="store.mockResponse" />
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.m-y {
  margin: 1rem 0;
}
.section-center {
  width: 90vw;
  max-width: var(--max-width);
  margin: 0 auto;
}
.page-hero {
  min-height: 10vh;
  display: grid;
  place-items: center;
  background: var(--clr-grey-10);
  color: var(--clr-grey-5);
}

.page-hero-title {
  font-weight: 500;
}
.main-products {
  display: flex;
  max-height: 100%;
  width: 100%;
  max-width: 100vw;
}
.products-container {
  padding: 2rem 3rem;
  display: flex;
  flex-wrap: wrap;
  /* grid-template-columns: 1fr 1fr; */
  flex-wrap: wrap;
  width: 100%;
  gap: 2rem;
}
.products-container-start {
  place-items: start;
}
.response {
  height: max-content;
  flex: 1 0 300px;
  width: 100%;
}
.sandbox-link {
  color: var(--clr-primary-5);
  font-weight: bold;
  transition: 0.3s all;
}
.sandbox-link:hover {
  color: var(--clr-primary-7);
  font-weight: bold;
}

.btn,
.btn:link {
  border: none;
  padding: 0.8em 1.5em;
  text-transform: uppercase;
  background-color: var(--clr-primary-5);
  color: white;
  overflow: hidden;
  transition: var(--transition);
}
.btn.btn-squared {
  border-radius: 0.7rem;
}
</style>
