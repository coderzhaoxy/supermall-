<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper :top-images="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info @imageLoad="imageLoad" :detail-info="detailInfo"></detail-goods-info>
      <detail-params-info ref="params" :param-info="paramsInfo"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :show-goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
    <toast ref="toast"></toast>

  </div>
</template>

<script>
  import DetailNavBar from "./childcomps/DetailNavBar";
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailBaseInfo from "./childcomps/DetailBaseInfo";
  import DetailShopInfo from "./childcomps/DetailShopInfo";
  import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
  import DetailParamsInfo from "./childcomps/DetailParamsInfo";
  import DetailCommentInfo from "./childcomps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childcomps/DetailBottomBar";

  import {getDetail, Goods, Shop, GoodsParams, getRecommend} from "../../network/detail";
  import Scroll from "../../components/common/bscroll/Scroll";
  import {backTopMixin} from "../../common/mixin";
  import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Detail",
    data() {
      return {
        id: null,
        topImage: [],
        goods: {},
        shopInfo: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0
      }
    },
    mixins: [backTopMixin],
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Toast
    },
    created() {
      this.id = this.$route.params.id
      //根据id请求响应数据
      getDetail(this.id).then(res => {
        const data = res.result
        //1.获取轮播图数据
        this.topImage = data.itemInfo.topImages
        //2.获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.获取店铺信息
        this.shopInfo = new Shop(data.shopInfo)
        //4.获取商品详细信息
        this.detailInfo = data.detailInfo
        this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      }),
        getRecommend().then(res => {
          this.recommends = res.data.list
        })
    },
    methods: {
      imageLoad() {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
        this.themeTopYs.push(Number.MAX_VALUE)
      },
      titleClick(index) {
        this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        //1.取出position中的Y值 之前是负值前面加个负号变成正值
        const positionY = -position.y
        const length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          if (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        this.isShowBack = (-position.y) > 1000
      },
      addToCart() {
        const product = {}
        product.image = this.topImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.id = this.id
        this.$store.dispatch('addCart', product).then(res => {
          this.$refs.toast.show(res, 2000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
