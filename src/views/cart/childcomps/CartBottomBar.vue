<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        @click.native="checkClick"
        :is-checked="isSelectAll"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="bottom-bar-span">
      <span class="bar-span"> 合计:{{ totalPrice }}</span>
    </div>
    <div class="calculate" @click="calcClick">结算({{ checkedLength }})</div>
    <toast ref="toast"></toast>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "../../../components/content/checkbutton/CheckButton";
import Toast from "../../../components/common/toast/Toast";

export default {
  name: "CartBottomBar",

  computed: {
    ...mapGetters(["cartList", "cartLength"]),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    isSelectAll() {
      if (this.cartList.length === 0) {
        return false;
      }
      return !this.cartList.find((item) => !item.checked);
    },
    checkedLength() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
  },
  components: {
    CheckButton,
    Toast,
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.checkedLength) {
        this.$refs.toast.show("您还没有选择宝贝哦", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 40px;
  position: absolute;
  line-height: 22px;
  background-color: #eee;
  display: flex;
  font-size: 13px;
  z-index: 9;
  bottom:49px;
}

.bottom-bar-span{
  width: 135px;
}
.bottom-bar-span .bar-span {
  padding-top: 10px;
  /* margin-left: 30px; */
  line-height: 41px;
}

.check-content {
  display: flex;
  padding-top: 10px;
  width: 75px;
}

.check-button {
  margin: 0 5px;
  height: 20px;
  width: 20px;
}
.calculate {
  width: 90px;
  height: 36px;
  margin-top: 2px;
  padding: 7px;
  margin-left: 65px;
  background-color: var(--color-high-text);
  text-align: center;
  border-radius: 20%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #ffffff;
}
</style>
