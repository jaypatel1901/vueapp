<template>
  <div>
    <!-- <h2>Edit Product</h2> -->
    <h2>Add Product</h2>

    <div class="container">
      <form v-on:submit.prevent="onSubmit">
        <div class="row">
          <div class="col-xl-6">
            <label>Product Name</label>
            <input
              class="form-control"
              type="text"
              v-model="product_name"
              placeholder="Add Product..."
              required
            />
          </div>
          <div class="col-xl-6">
            <label>Price</label>
            <input
              class="form-control"
              type="text"
              v-model="price"
              placeholder="Add Price..."
              required
            />
          </div>
          <div class="col-xl-6">
            <label>Description</label>
            <input
              class="form-control"
              type="text"
              v-model="description"
              placeholder="Add Description..."
              required
            />
          </div>
          <div class="col-xl-6">
            <label>SKU</label>
            <input class="form-control" type="text" v-model="sku" placeholder="Add sku..." required />
          </div>
          <div class="col-xl-6">
            <label>Quantity</label>
            <input
              class="form-control"
              type="number"
              v-model="quantity"
              placeholder="Quantity..."
              required
            />
          </div>
          <!-- <div class="col-xl-6">
            <input class="form-control"  type="file" placeholder="Quantity..." required />
          </div>-->
          <div class="col-xl-6">
            <label>Select Category</label>
            <select class="form-control" v-model="category_id">
              <option>select category</option>
              <option
                v-for="item in Category"
                :key="item.id"
                v-bind:value="item.id"
              >{{item.id}}{{item.category_name}}</option>
            </select>
          </div>
          <div class="col-xl-12">
            <button class="btn btn-success">submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
export default {
  name: "Addproduct",
  beforeCreate() {
    console.log("At this point, events and lifecycle have been initialized.");
  },
  data: () => ({
    product_name: "",
    sku: "",
    price: "",
    quantity: "",
    category_id: "",
    description: "",
    Category: "",
  }),

  mounted() {
    console.log("At this point, events and lifecycle have been initialized.");
    this.getCategory();
  },

  methods: {
    onSubmit() {
      console.log(
        "this.quantity",
        this.quantity,
        this.category_id,
        this.product_name
      );
      const res = axios.post("http://localhost:4000/graphql", {
        query: `
    mutation createProduct($product_name: String!,$quantity:Int!,$sku:String!,$category_id:Int!,$description:String!,$price:Int!){
    createProduct(product_name: $product_name,quantity:$quantity,sku:$sku,category_id:$category_id,description:$description,price:$price) 
  }`,
        variables: {
          product_name: this.product_name,
          quantity: parseInt(this.quantity),
          sku: this.sku,
          category_id: parseInt(this.category_id),
          description: this.description,
          price: parseInt(this.price),
        },
      });
      this.updatedChampion = res;
      alert("product Added")
    },
    async getCategory() {
      try {
        const res = await axios.post("http://localhost:4000/graphql", {
          query: `{ getCategory{
            id
            category_name
          } }`,
        });
        this.Category = res.data.data.getCategory;
      } catch (e) {
        console.log("err", e);
      }
    },
  },
};
</script>

<style scoped>
.add-product {
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  width: 1200px;
  margin: 0 auto;
  /*    background: red;
*/
  margin-top: 20px;
  margin-bottom: 22px;
}
form {
  display: flex;
  justify-content: space-between;
}
.form-control {
  margin-bottom: 30px;
  margin-top: 20px;
}
.add-product h2 {
  margin-top: -15px;
  margin-bottom: 26px;
  font-family: sans-serif;
  font-size: 35px;
}

table.table {
  width: 100%;
}

@media (max-width: 767px) {
  form {
    display: block;
  }
  .add-product {
    width: 100%;
  }
  input[type="text"] {
    margin-bottom: 20px;
  }
}
</style>
