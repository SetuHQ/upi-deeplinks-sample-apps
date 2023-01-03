<script>
  // @ts-nocheck

  import { get } from "svelte/store";
  import { product } from "./data/product";
  import Header from "./lib/Header/Header.svelte";
  import ProductCard from "./lib/ProductCard/ProductCard.svelte";
  import { UPIResponse, mockResponse } from "./store";
  import { JsonView } from "@zerodevx/svelte-json-view";
  let UPIResponseValue;
  let mockResponseValue;

  UPIResponse.subscribe((value) => {
    UPIResponseValue = value;
  });
  mockResponse.subscribe((value) => {
    mockResponseValue = value;
  });

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
            response: UPIResponseValue,
            price: product.productPrice,
          }),
        }
      );
      const paymentResponse = await response.json();
      mockResponse.set(paymentResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
</script>

<Header />
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
    {#if UPIResponseValue && Object.keys(UPIResponseValue).length}
      <div class="response">
        <p>This is the response that you get from the upi-deep-links</p>
        <div class="response">
          <JsonView json={UPIResponseValue} />
        </div>
        <a
          href={UPIResponseValue?.paymentLink.shortURL}
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
        <button on:click={mockPayment} class="btn btn-squared m-y">
          Mock Payment
        </button>
        {#if mockResponseValue && Object.keys(mockResponseValue).length}
          <div>
            <p>Response from mock payment</p>
            <JsonView json={mockResponseValue} />
          </div>
        {/if}
      </div>
    {/if}
  </section>
</section>

<style>
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

  .response {
    height: max-content;
    flex: 1 0 300px;
    width: 100%;
    overflow-x: auto;
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
