/*
 * @Author: your name
 * @Date: 2021-05-27 20:45:38
 * @LastEditTime: 2021-07-16 16:08:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \supermall\src\network\request.js
 */
import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  return instance(config)
}
