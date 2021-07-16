<template>
  <div class="sub-list">
    <cate-scroll-list-item :mati-info="maitKey"></cate-scroll-list-item>
  </div>
</template>

<script>
  import CateScrollListItem from "./CateScrollListItem";

  export default {
    name: "CateScrollList",
    components: {CateScrollListItem},
    props: {
      maitKey: Object,
      default() {
        return {}

      }
    },
    data() {
      return {

      }
    },
    // created() {
    //   setTimeout(() => {
    //     this.maitKey.forEach(item => {
    //       getSubcategory(item.maitKey).then(res => {
    //
    //
    //       })
    //     })
    //     // console.log(this.infoImg.list);
    //   }, 1000)
    //
    //
    // },
    // mounted() {
    //
    // }
  }
</script>

<style scoped>


</style>
