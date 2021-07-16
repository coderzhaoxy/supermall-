<template>
  <div id="cate">
    <div class="wrapper"></div>
    <cate-nav-bar class="nav-bar"></cate-nav-bar>
    <scroll class="content" ref="scroll">
      <cate-side-bar @sideClick="sideClick" :title="titles"></cate-side-bar>
    </scroll>
    <scroll class="low-content" ref="scroll1" @pullingUp="LoadMore">
      <cate-scroll-list :mait-key="infoImg" class="cate-list"></cate-scroll-list>
      <tab-control class="tab-con" :title="['综合','新品','销量']" @tabClick="tabClick"></tab-control>
      <category-detail :category-detail="cateDetail[currentType]"></category-detail>
    </scroll>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
  import CateSideBar from "./childcomps/CateSideBar";
  import CateNavBar from "./childcomps/CateNavBar";
  import Scroll from "../../components/common/bscroll/Scroll";
  import CateScrollList from "./childcomps/CateScrollList";
  import TabControl from "../../components/content/tabcontrol/TabControl";
  import CategoryDetail from "./childcomps/CategoryDetail";

  import {getCategory, getSubcategory, getCategoryDetail} from "../../network/category";
  import Toast from "../../components/common/toast/Toast";

  export default {
    name: "Category",
    components: {
      Toast,
      CateSideBar,
      CateNavBar,
      Scroll,
      CateScrollList,
      TabControl,
      CategoryDetail
    },
    data() {
      return {
        titles: [],
        maitKeys: [],
        cMaitKey: null,
        miniWallkey: [],
        cMiniWallkey: [],
        infoImg: {title: '', link: '', list: []},
        currentIndex: 0,
        cateDetail: {
          'pop': [],
          'sell': [],
          'new': []
        },
        currentType: 'pop'
      }
    },
    created() {
      getCategory().then(res => {
        this.miniWallkey.push(...res.data.category.list)
        this.miniWallkey.forEach(item => {
          this.cMiniWallkey.push(parseInt(item.miniWallkey))
        })
        const data = res.data.category.list
        // this.miniWallkey = data.category.list[1].miniWallkey
        this.titles.push(...data)
        this.titles.forEach(item => {
          this.maitKeys.push(item)
        })
        //请求第一页的数据
        this._getSubcategory(0)
      })
    },
    methods: {
      _getSubcategory(index) {
        this.currentIndex = index
        this.cMaitKey = this.maitKeys[index].maitKey
        getSubcategory(this.cMaitKey).then(res => {
          let data = res.data
          this.infoImg.title = data.info.title
          this.infoImg.link = data.info.link
          this.infoImg.list = data.list
          this._getCategoryDetail('pop')
          this._getCategoryDetail('sell')
          this._getCategoryDetail('new')
        })
        this.$refs.scroll1.scroll.scrollTo(0, 0, 100)
      },
      _getCategoryDetail(type) {
        const miniWallkey = this.cMiniWallkey[this.currentIndex]
        getCategoryDetail(miniWallkey, type).then(res => {
          this.cateDetail[type] = res
        })
      },
      sideClick(index) {
        this._getSubcategory(index)
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
      },
      LoadMore() {
        this.$refs.toast.show('暂时没有更多数据了', 3000)
        this.$refs.scroll1.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>
  #cate {
    height: 100vh;
  }

  .wrapper {
    width: 100px;
    background-color: #f6f6f6;
    overflow: hidden;
  }

  .nav-bar {
    background-color: var(--color-high-text);
    color: #fff;
    position: relative;
    z-index: 99;
  }

  .content {
    height: calc(100% - 44px - 49px);
    
  }

  .low-content {
    width: calc(100% - 100px);
    height: calc(100% - 44px - 49px);
    background-color: #fff;
    position: absolute;
    top: 44px;
    right: 0px;
  }

  .tab-con {
    margin: 10px 0;
  }

  .cate-list {
 width: calc(100% - 0px);
  }
</style>
