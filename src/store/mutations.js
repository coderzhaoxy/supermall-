export  default  {
  //mutations的目的是修改state中的状态
  //mutations中的方法尽可能完成是事件比较单一
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    state.cartList.push(payload)
  }
}
