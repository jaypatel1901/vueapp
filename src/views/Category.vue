<template>
  <div>
    <!-- <h2>Edit Product</h2> -->
    <h2>Add Category</h2>

    <div class="container">
      <form v-on:submit.prevent="onSubmit">
        <div class="card">
          <div class="col-xl-6">
            <label>Category Name</label>
            <input
              class="form-control"
              type="text"
              v-model="category_name"
              placeholder="Add category..."
              required
            />
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
  name: "Category",
 
  data: () => ({
   category_name:''
  }),

  mounted() {
    this.getCategory();
  },

  methods: {
    onSubmit() {
      console.log(
        "this.quantity",
     this.category_name
      );
      const res = axios.post("http://localhost:4000/graphql", {
        query: `
   mutation createCategory($category_name: String!){
    createCategory(category_name: $category_name)
  }`,
        variables: {
          category_name: this.category_name,
        },
      });
      this.updatedChampion = res;
      alert("product Category");
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
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  flex: auto;
  background-color: ghostwhite;
}
</style>
