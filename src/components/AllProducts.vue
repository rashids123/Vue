<template>
  <div class="container">
    <center><h2>Spire Store</h2></center>
    <hr />
    <h3>Welcome to our store. Check out our product categories below.</h3>
    <div class="row">
      <div
        class="col-md-3"
        v-for="(item, index) in allProdsCategories"
        :key="index"
      >
        <div class="thumbnail">
          <router-link :to="'/categories/' + item.id" class="sub-side-links">
            <img v-bind:src="item.image_url" class="img-thumbnail img-fluid" />
            <h4>
              {{ item.name }}
            </h4>
          </router-link>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <hr />
    <br />
    <br />
    <h3>Here are some featured products we think you will enjoy.</h3>
    <div class="row">
      <div
        class="col-md-3"
        v-for="(featured_item, ind) in featured_products"
        :key="ind"
      >
        <div class="thumbnail">
          <router-link
            :to="'/product_detail/' + featured_item.id"
            class="sub-side-links"
          >
            <img
              v-bind:src="featured_item.image_url"
              class="img-thumbnail img-fluid"
            />
            <h4>
              {{ featured_item.name }}
            </h4>
          </router-link>
          <p>$ {{ featured_item.price }}</p>
          <p>
            Rated: <b>{{ featured_item.average_rating }}/5</b>
          </p>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
export default {
  name: "AllProducts",
  data() {
    return {
      allProdsCategories: [],
      featured_products: []
    };
  },
  mounted() {
    this.getProducts();
    this.getFeaturedProducts();
  },
  methods: {
    getProducts() {
      axios
        .get(
          "https://gyrxx63245.execute-api.us-east-1.amazonaws.com/default/SpireChallengeStore/categories"
        )
        .then(resp => {
          this.allProdsCategories = resp.data;
        });
    },
    getFeaturedProducts() {
      axios
        .get(
          "https://gyrxx63245.execute-api.us-east-1.amazonaws.com/default/SpireChallengeStore/products"
        )
        .then(res => {
          let featured = _.filter(res.data, o => o.is_featured == true);
          this.featured_products = featured;
        });
    }
  }
};
</script>
<style scoped></style>
