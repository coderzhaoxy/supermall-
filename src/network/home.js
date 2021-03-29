import {request} from "./request";

export function getHomeMultidata() {
return request({
  url:'/home/multidata'
})
}
//'?type=sell&page=1'
export function getHomeGoods(type,page) {
return request({
  url:'/home/data',
  params:{
    type,
    page
  }
})
}
