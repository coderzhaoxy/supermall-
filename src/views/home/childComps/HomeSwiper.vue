<!--
 * @Author: your name
 * @Date: 2021-05-27 20:59:52
 * @LastEditTime: 2021-07-06 21:30:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pramall\src\views\home\childcomps\HomeSwiper.vue
-->
<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <img :src="item.image" @load="imageLoad" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '../../../components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        isImageLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if (!this.isImageLoad) {
          this.$emit('topImageLoad')
        }
      }
    },
  }
</script>

<style scoped>

</style>
