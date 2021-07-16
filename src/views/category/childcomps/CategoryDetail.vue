<template>
  <div>
      <goods-list-item v-for="(item,index) in categoryDetail" :key="index" :goods-item="item" class="item" ></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from "../../../components/content/goods/GoodsListItem";

  export default {
    name: "CategoryDetail",
    components: {
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }

      }
    }
  }
</script>

<style scoped>
  .item {
    display: inline-block;
    margin-right: 4px;
  }
</style>
