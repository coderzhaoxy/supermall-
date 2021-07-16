<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div class="title-item"
           v-for="(item,index) in title"
           @click="itemClick(index)"
           :class="{active:currentIndex ===index}">
        {{item}}
      </div>
    </div>
  </nav-bar>


</template>

<script>
  import NavBar from "../../../components/content/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      itemClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 6px;
  }
</style>
