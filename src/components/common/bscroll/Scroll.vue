<!--
 * @Author: your name
 * @Date: 2021-05-29 11:10:19
 * @LastEditTime: 2021-07-16 16:14:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\components\common\bscroll\Scroll.vue
-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    (this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,//监听滚动的参数
      pullUpLoad: this.pullUpLoad,//下拉加载
      observeDOM: true,//开启对 DOM 改变的探测 变化时触发refresh() 刷新
      observeImage: true,//开启对子元素中图片元素的加载的探测
      click: true,//
      keepAlive: true,//开启记录滚动的位置
      pullUpLoad:true,
    })),
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      }),
      //监听滚动的位置
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
  },
  methods: {
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
</style>
