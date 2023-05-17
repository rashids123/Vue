<template>
  <div class="container">
    <center><h2>Spire Store</h2></center>
    <hr />
    <router-link
      :to="'/categories/' + detail.category_id"
      class="sub-side-links"
    >
      > Product Category
    </router-link>
    <div class="row">
      <div class="col-md-6">
        <img v-bind:src="detail.image_url" class="img-thumbnail img-fluid" />
      </div>
      <div class="col-md-6">
        <h4>{{ detail.name }}</h4>
        <p>
          Rated {{ detail.average_rating }} / 5 By
          {{ detail.rating_count }} Customers
        </p>
        <p>$ {{ detail.price }}</p>

        <a
          href="javascript:void(0)"
          class="btn btn-primary btn-xl"
          @click="addToCart(detail.name)"
          >Add to Cart</a
        >
      </div>
    </div>
    <hr />
    <h3>What You Need To Know</h3>
    <p>{{ detail.description }}</p>
    <hr />
    <h3>You May Also Like</h3>
    <div class="row">
      <div class="col-md-3" v-for="(item, ind) in related_products" :key="ind">
        <div class="thumbnail">
          <router-link
            :to="'/product_detail/' + item.id"
            class="sub-side-links"
          >
            <img v-bind:src="item.image_url" class="img-thumbnail img-fluid" />
            <h4>
              {{ item.name }}
            </h4>
          </router-link>

          <p>$ {{ item.price }}</p>
          <p>
            Rated: <b>{{ item.average_rating }}/5</b>
          </p>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CategoryProduct",
  data() {
    return {
      related_products: [],
      detail: {},
      prod_id: null
    };
  },
  watch: {
    "$route.params.id": {
      handler(newValue) {
        this.related_products = [];
        this.prod_id = newValue;
        this.productDetail();
      },
      immediate: true
    }
  },
  methods: {
    productDetail() {
      axios
        .get(
          `https://gyrxx63245.execute-api.us-east-1.amazonaws.com/default/SpireChallengeStore/products?id=${this.prod_id}`
        )
        .then(resp => {
          this.detail = resp.data;
          this.getRelatedProducts(resp.data.related_ids);
        });
    },

    getRelatedProducts(ids) {
      for (var i = 0; i < ids.length; i++) {
        axios
          .get(
            `https://gyrxx63245.execute-api.us-east-1.amazonaws.com/default/SpireChallengeStore/products?id=${ids[i]}`
          )
          .then(resp => {
            this.related_products.push(resp.data);
          });
      }
    },
    addToCart(val) {
      console.log(`product: ${val} is added to cart successfully`);
      alert(`product: ${val} is added to cart successfully`);
    }
  }
};
</script>
<style scoped></style>
