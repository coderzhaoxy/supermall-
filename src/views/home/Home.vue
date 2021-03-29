<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" ref="tabControl1" class="tab-control"
                 v-show="isTabFixed"
    ></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommends-view :recommends="recommends"></recommends-view>
      <feature-view/>
      <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendsView from "./childComps/RecommendsView";
  import FeatureView from "./childComps/FeatureView";


  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import GoodsListItem from "../../components/content/goods/GoodsListItem";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/untils";
  import {itemListenerMixin, backTopMixin} from "../../common/mixin";


  export default {
    name: "Home",
    components: {
      RecommendsView,
      HomeSwiper,
      FeatureView,
      GoodsList,
      GoodsListItem,
      NavBar,
      TabControl,
      Scroll,
      BackTop

    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,

      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    computed: {
      showGoods() {
        return this.goods[this.currentType].list


      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 1)

    },
    deactivated() {
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
//2.取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
//2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {

      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // // 1.监听item中图片加载完成
      //
      // //对监听的事件进行保存
      // this.itemImgListener = () => {
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
      // () => {
      //   // this.scroll && this.$refs.scroll.refresh()
      //   refresh('2222')
      //   // if (this.scroll){
      //   //   this.$refs.scroll.refresh()
      //   // }else {}
      // }
    },
    methods: {

      //事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        //1.判断backTop是否显示
        // console.log(position);
        this.isShowBackTop = (-position.y) > 1000

        //2.决定tabControl是否吸顶(fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
//2.获取tabControl的offsetTop
        //所有组件都有一个属性$el

        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      //网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, 1).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()

        })
      },

    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*视口高度*/
    height: 100vh;
    position: relative;

  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*使用浏览器原始滚动时，为了让导航不跟随滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.content{*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  !*margin-top: 44px;*!*/
  /*}*/
  .content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
