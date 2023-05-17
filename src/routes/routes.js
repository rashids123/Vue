import CategoryProduct from "@/components/CategoryProduct";
import AllProducts from "@/components/AllProducts";
import ProductDetail from "@/components/ProductDetail";

const routes = [
  {
    path: "/",
    component: AllProducts
  },
  {
    path: "/categories/:id",
    component: CategoryProduct,
    name: "category-products"
  },
  {
    path: "/product_detail/:id",
    component: ProductDetail,
    name: "products-detail"
  }
];
export default routes;
