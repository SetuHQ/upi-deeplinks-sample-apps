<script setup lang="ts">
import { product } from "../../data/product";
import { store } from "../../store";

const createLink = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/upi-pay`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: product.productPrice, id: product._id }),
      }
    );
    const link = await response.json();
    store.setUPIResponse(link.paymentLinkResponse);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <article class="card card-product">
    <div class="card-img">
      <img :src="product.imgUrl" :alt="product.productTitle" />
    </div>

    <div class="card-details p-smaller">
      <div class="card-stars flex-al-center">
        <span class="card-review m-left-smallest">
          {{ product.reviews }} Reviews
        </span>
      </div>
      <div class="card-title m-bottom-smaller">{{ product.productTitle }}</div>
      <div class="card-price">
        Rs. {{ product.productPrice }}
        <span class="m-left-small"> Rs.{{ product.productOgPrice }} </span>
      </div>
      <div class="card-desc">
        <p class="m-bottom-smaller">
          <span>
            <i class="fas fa-square m-right-smallest" />
          </span>
          1.54 inch display
        </p>
        <p class="m-bottom-smaller">
          <span>
            <i class="fas fa-square m-right-smallest" />
          </span>
          Temperature Monitoring
        </p>
        <p class="m-bottom-smaller">
          <span>
            <i class="fas fa-square m-right-smallest" />
          </span>
          100+ cloud watch faces
        </p>
      </div>

      <button
        @click="createLink"
        type="button"
        class="btn btn-squared m-top-small"
      >
        Pay with Upi
      </button>
    </div>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  height: 100%;
  width: 100%;
  width: 400px;
  max-height: 460px;
  border-radius: 4px;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: var(--light-shadow);
  outline: 1px solid var(--clr-grey-9);
}
.card-product {
  max-width: 28rem;
}

.card-img {
  position: relative;
  text-align: center;
  background: #c4c1c2;
  transition: var(--transition);
}

.card-img > img {
  width: 25rem;
}

.card-img:hover .card-img-overlay,
.card-img:hover .card-img-overlay-symbol {
  opacity: 1;
  pointer-events: all;
}

.card-details {
  background: #f8f9fa;
  /* color: black; */
}
.card-stars > span > i {
  color: var(--clr-primary-5);
}

.card-review {
  font-size: 0.9rem;
}

.card-title {
  font-weight: 700;
  letter-spacing: 0.5px;
  font-size: 1.8rem;
}

.card-price {
  font-size: 1.5rem;
  color: var(--clr-primary-5);
  letter-spacing: 1px;
  font-weight: 600;
}

.card-price > span {
  font-size: 1.1rem;
  position: relative;
  color: var(--clr-grey-6);
  text-decoration: line-through;
}

.card-desc {
  font-size: 1rem;
  letter-spacing: 0.5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.4rem 0;
}
.card-desc span i {
  color: var(--clr-primary-5);
}

/* Note: Card dismiss */
.card.card-dismiss {
  max-width: 35rem;
  padding: 1rem 2rem;
  color: var(--clr-white);
  background-image: linear-gradient(
    to left,
    var(--clr-grey-1),
    var(--clr-grey-4)
  );
}

.card .card-grid .card-grid-container {
  border-radius: 1rem;
  overflow: hidden;
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
