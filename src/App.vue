<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/addproduct">Add Product</router-link>|
      <router-link to="/category">Add Category</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
