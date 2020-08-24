<template>
  <div class="hello">
    <hr />
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Description</th>
            <th scope="col">Quality</th>
            <th scope="col">SKU</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">QR code</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in example1" :key="item.id">
            <td>{{item.product_name}}</td>
            <td>{{item.description}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.sku}}</td>
            <td>{{item.category_name}}</td>
            <td>{{item.price}}</td>
            <td>
              <qrcode-vue :value="item" :size="size" level="H"></qrcode-vue>
            </td>
            <td>
              <button class="btn btn-danger" @click="onDelete(item)">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    QrcodeVue,
  },
  data() {
    return {
      example1: "",
      deleteMsg: "",
      pageNum: 0,
      value: "",
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      console.log(this.pageNum);
      let limit = 10;
      let offset = limit * (this.pageNum - 1);
      console.log("this.page number", this.pageNum, offset);

      try {
        const res = await axios.post("http://localhost:4000/graphql", {
          query: `{ getProduct{
            id,
            product_name,
            quantity,
            sku,
            category_id,
            description,
            price
            category_name
          } }`,
        });
        this.example1 = res.data.data.getProduct;
      } catch (e) {
        console.log("err", e);
      }
    },
    onDelete(item) {
      console.log("click on delete", item.id);
      try {
        const res = axios.post("http://localhost:4000/graphql", {
          query: `mutation deleteProduct {
            deleteProduct (
            id: ${item.id}
           )
           }`,
        });
        this.getProduct();
        this.Category = res;
      } catch (e) {
        console.log("err", e);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.products-listing li {
  background: #fff;
  padding: 15px;
  /*border-radius: 5px;*/
  margin-bottom: 20px;
  list-style: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 32%;
  display: inline-block;
  margin-right: 15px;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
}
.products-listing li button {
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #000;
  font-size: 16px;
  cursor: pointer;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.table {
  width: 100%;
}
button.edit_btn {
  width: 40px;
  background: #76a3c1 !important;
  height: 40px;
  font-family: sans-serif;
  font-weight: bolder;
  color: #fff !important;
  border-radius: 40px !important;
  margin-top: 10px;
  margin-right: 15px;
  border-radius: 0px;
  border: none;
}

button.delete_btn {
  width: 40px;
  background: red !important;
  height: 40px;
  font-family: sans-serif;
  font-weight: bolder;
  color: #fff !important;
  border-radius: 40px !important;
  margin-top: 10px;
  margin-right: 0px;
  border-radius: 40px;
  margin-bottom: 15px;
  border: none;
}
.col-custom h3 {
  text-align: center;
  font-size: 24px;
  padding-top: 10px;
  padding-bottom: 5px;
  font-family: sans-serif;
}
span.span_para {
  color: #767676;
  font-size: 18px;
  font-family: inherit;
}

@media (max-width: 767px) {
  .container {
    width: 100%;
  }
  .products-listing li {
    width: 100%;
    display: block;
  }
}
.pagination li {
  padding: 5px 10px;
  border: 1px solid #89d3ec;
}
.pagination li.active {
  background-color: #20c8ff;
}
.pagination li.active a {
  color: white;
}
.paginationpage {
  background-color: aliceblue;
  padding: 5px;
}
</style>
