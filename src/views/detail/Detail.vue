<template>
  <div id="detail">
    <!--//导航-->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <ul>
      <li v-for="item in $store.state.cartList">{{item}}</li>
      </ul>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from "./childcomps/DetailNavBar";
  import DetailSwiper from "./childcomps/DetailSwiper";
  import DetailBaseInfo from "./childcomps/DetailBaseInfo";
  import DetailShopInfo from "./childcomps/DetailShopInfo";
  import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
  import DetailParamInfo from "./childcomps/DetailParamInfo";
  import DetailCommentInfo from "./childcomps/DetailCommentInfo";
  import DetailBottomBar from "./childcomps/DetailBottomBar";


  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/untils";
  import {itemListenerMixin, backTopMixin} from "../../common/mixin"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,

      }

    },

    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index) {

        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // console.log(position);
        //1.获取Y值
        const positionY = -position.y
        // console.log(Number.MAX_VALUE);
        // positionY和主题中值进行对比
        //positionY在
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          // if (positionY >  this.themeTopYs[i] && positionY< this.themeTopYs[i+1]) {
          //
          // }

          if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
          // 0123      -1 0 1 2
          // if (this.currentIndex !== i &&(i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) ||
          //   (i === length - 1 && positionY >= this.themeTopYs[i]) ) {
          // this.currentIndex =  i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }

        }
        //3.是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000
      },
      addToCart() {
        //1.获取购物车需要展示商品信息添加进去
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //2.将商品添加到购物车里面
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product)
      }


    },
    created() {
      //1保存传入的iid
      this.iid = this.$route.params.iid
      // 2根据iid请求详细数据
      getDetail(this.iid).then(res => {
        //获取顶部图片轮播数据

        const data = res.result
        this.topImages = res.result.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //创建店铺信息
        this.shop = new Shop(data.shopInfo)

        //保存商品的详情数据
        this.detailInfo = data.detailInfo

        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // this.$nextTick(()=>{
        // 根据最近的数据 对应的DOM是已经被渲染出来了的
        // 但是图片依然是没有加载完的(目前获取到offsetTop不包含其中的图片)
        // offsetTop值不对的时候，都是因为图片的问题
        // this.themeTopYs = []
        // this.themeTopYs.push(0)
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //
        // console.log(this.themeTopYs);
        // })

        // console.log(data);
//4. 给getThemeTopY赋值(对this.getThemeTopY赋值的操作进行防抖)
        this.getThemeTopY = debounce(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)

          // console.log(this.themeTopYs);
        }, 200)
      }),
        //3请求推荐数据
        getRecommend().then(res => {
          this.recommends = res.data.list
        })
    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

</style>
