<template>
  <div class="side-bar">
    <div class="title-item" v-for="(item,index) in title"
         @click="itemClick(index)"
         :key="index"
         :class="{active:currentIndex === index}">
      {{item.title}}
<!--      {{item.maitKey}}-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "cateBar",
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }

    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('sideClick', index)


      }
    }
  }
</script>

<style scoped>
  .side-bar {
    background-color: #f6f6f6;
    width: 100px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .title-item {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }
</style>
