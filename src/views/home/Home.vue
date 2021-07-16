<template xmlns:tab-control="http://www.w3.org/1999/xlink">
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <tab-control v-show="isTabFixed" :title="['流行','新款','精选']" @tabClick="tabClick" class="tab-control"
                 ref="tabControl1"></tab-control>
    <scroll class="content"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="LoadMore"
            ref="scroll"
            @scroll="contentScroll">
      <home-swiper :banners="banners" @topImageLoad="topImageLoad"></home-swiper>
      <recommends-view :recommend="recommend"></recommends-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']" @tabClick="tabClick" class="tab-control" ref="tabControl2"></tab-control>
      <goods-list :show-goods="showGoods"></goods-list>
    </scroll>
    <back-top v-show="isShowBack" @click.native="backClick"></back-top>
  </div>
</template>

<script>
  import NavBar from "../../components/content/navbar/NavBar";
  import HomeSwiper from "./childcomps/HomeSwiper";
  import RecommendsView from "./childcomps/RecommendsView";
  import FeatureView from "./childcomps/FeatureView";
  import TabControl from "../../components/content/tabcontrol/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import GoodsListItem from "../../components/content/goods/GoodsListItem";
  import BackTop from "../../components/content/backTop/BackTop";

  import {GetHomeMultidata, GetHomeGoods} from "../../network/home";
  import Scroll from "../../components/common/bscroll/Scroll";

  export default {
    name: "Home",
    components: {
      RecommendsView,
      NavBar,
      HomeSwiper,
      FeatureView,
      TabControl,
      GoodsList,
      GoodsListItem,
      BackTop,
      Scroll
    },
    data() {
      return {
        banners: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        saveY: 0,
        isShowBack: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    created() {
      this.GetHomeMultidata()
      this.GetHomeGoods('pop')
      this.GetHomeGoods('new')
      this.GetHomeGoods('sell')
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scroll.scrollTo(0, this.saveY, 1)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
      GetHomeMultidata() {
        GetHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommend = res.data.recommend.list
        })
      },
      GetHomeGoods(type) {
        const page = this.goods[type].page += 1
        GetHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
        })
      },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case  1:
            this.currentType = 'new'
            break
          case  2:
            this.currentType = 'sell'
            break
        }
        //当点击的时候让当前保存的currentIndex 等于 index
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      LoadMore() {
        this.GetHomeGoods(this.currentType)
        //上拉加载更多完成调用一下 finishPullUp()才可进行下一次加载更多
        this.$refs.scroll.scroll.finishPullUp()
      },
      contentScroll(position) {
        //判断返回顶部是否显示
        this.isShowBack = (-position.y) > 2000
        //判断是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0, 0, 500)
      },
      topImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
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

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
