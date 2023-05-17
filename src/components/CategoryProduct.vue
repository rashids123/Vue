<template>
  <div class="container">
    <center><h2>Spire Store</h2></center>
    <hr />
    <h3>{{ detail.name }}</h3>
    <p>{{ detail.description }}</p>
    <br />
    <div class="row">
      <div class="col-md-3" v-for="(item, ind) in products" :key="ind">
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
      products: [],
      detail: {},
      cat_id: null
    };
  },
  watch: {
    "$route.params.id": {
      handler(newValue) {
        this.cat_id = newValue;
        this.getCategorydet();
      },
      immediate: true
    }
  },
  methods: {
    getCategorydet() {
      axios
        .get(
          `https://gyrxx63245.execute-api.us-east-1.amazonaws.com/default/SpireChallengeStore/categories?id=${this.cat_id}`
        )
        .then(resp => {
          this.detail = resp.data;
          this.getCategoryProducts();
        });
    },
    getCategoryProducts() {
      axios
        .get(
          `https://gyrxx63245.execute-api.us-east-1.amazonaws.com/default/SpireChallengeStore/products?category_id=${this.cat_id}`
        )
        .then(resp => {
          this.products = resp.data;
        });
    }
  }
};
</script>
<style scoped></style>
