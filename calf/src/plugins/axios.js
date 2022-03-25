/**
 * @desc: axios封装
 * @author: calf
 * @module: axios
 * @description: 配合使用 饿了么的 Message和Loading
 *
 */

import axios from 'axios'
import qs from 'qs'
import { Message, Loading } from 'element-ui'
import router from '@/router'

let loading
const headerNone = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
const headerTwo = { 'Content-Type': 'application/json; charset=UTF-8' }
const baseURL = window.location.origin

/**
 * @desc: 定义初始化Loading
 * @method: startLoading
 */
const startLoading = () => {
  loading = Loading.service({ target: '.content-box', background: 'rgba(220, 220, 220, 0.51)' })
}
let count = 0

/**
 * @desc: 显示Loading 同时多个发送请求 只开启一次Loading
 * @method: showLoading  && hideLoading
 */
const showLoading = () => {
  if (count === 0) startLoading()
  count++
}

const hideLoading = () => {
  if (count <= 0) return
  count--
  if (count === 0) {
    setTimeout(() => {
      loading.close()
    }, 300)
  }
}

export const filter = (r) => {
  for (let item of Object.keys(r)) {
    if (r[item] === ' ' || r[item] === '') {
      delete r[item]
    }
  }
}

/**
 * @desc: 出口
 * @exports api
 * @param:options 必须是对象
 * options 对象为 axios对应参数
 */
export default (options) => {
  /**
   * @description: 用来初始化承诺的回调。
   * 这个回调被传递了两个参数：
   * 一个解析回调用一个值或另一个承诺的结果来解析承诺，
   * 以及一个拒绝回调，用来拒绝承诺的原因或错误。
   * @constructor: Promise
   */
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      withCredentials: true,
      headers: headerNone,
      baseURL
    })

    // 请求拦截器
    instance.interceptors.request.use(
      (config) => {
        const { load = true } = config.data || config.params || {}
        if (load) showLoading()
        // 过滤无效值
        if (config.params) {
          delete config.params.load
          filter(config.params)
        } else if (config.data) {
          delete config.data.load
          filter(config.data)
        }
        // json 格式传递
        if (['post', 'put'].includes(config.method.toLocaleLowerCase())) {
          if (config.json) {
            config.headers = headerTwo
          } else {
            config.data = qs.stringify(config.data)
            config.data = config.data + '&t=' + Date.now()
          }
        }
        return config
      },
      (error) => {
        hideLoading()
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    instance.interceptors.response.use(
      (response) => {
        setTimeout(hideLoading, 0)
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (!response.data) {
          data = response.request.responseText
        } else {
          data = response.data
        }

        switch (data.code) {
          case '001':
            Message({
              showClose: true,
              message: data.msg || '未知错误，请联系管理员',
              type: 'error'
            })
            router.push({
              name: 'error404'
            })
            break
          default:
            Message({
              showClose: true,
              message: data.msg || '未知错误，请联系管理员',
              type: 'error'
            })
            router.push({
              name: 'error404'
            })
        }
        return data
      },
      (error) => {
        hideLoading()
        if (error && error.response) {
          let msg = {
            400: '请求错误',
            401: '未授权，请登录',
            403: '拒绝访问',
            404: `请求地址出错: ${error.response.request.responseURL}`,
            408: '请求超时',
            500: '服务器内部错误',
            501: '服务未实现',
            502: '网关错误',
            503: '服务不可用',
            504: '网关超时',
            505: 'HTTP版本不受支持'
          }
          let status = parseInt(error.response.status, 10)
          Message({
            showClose: true,
            message: msg[status] || '',
            type: 'error'
          })
        } else {
          Message({
            message: error.config ? `请求地址出错: ${error.config.url}` : error,
            type: 'error'
          })
        }
        return Promise.reject(error)
      }
    )

    // 请求
    instance(options)
      .then((res) => {
        resolve(res)
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
