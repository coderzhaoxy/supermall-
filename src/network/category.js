/*
 * @Author: your name
 * @Date: 2021-06-10 19:48:38
 * @LastEditTime: 2021-07-16 16:07:07
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\network\category.js
 */
import { request } from "./request";

export function getCategory() {
  return request({
    url: '/category',
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
