import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Addproduct from './views/Addproduct.vue'
import Category from './views/Category.vue'
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
        path: "/addproduct",
        name: "addproduct",
        component: Addproduct
      },
      {
        path: "/category",
        name: "category",
        component: Category
      },
      
  ]
});
