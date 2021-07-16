<template>
  <div class="goods" >
    <goods-list-item  v-for="item in showGoods" :goods-item="item" @click="itemClick"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";

  export default {
    name: "GoodsList",
    props: {
      showGoods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    },
    methods:{
      itemClick(){
        console.log(this.showGoods);
      }
    }

  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px 0 0 0;
  }
</style>
