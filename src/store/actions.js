export default {
  addCart(context, payload) {
    return new Promise(((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.id === payload.id)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加购物车成功')
      }
    }))
  }
}
