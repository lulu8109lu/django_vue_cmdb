import util from '@/libs/util.js'
import store from '@/store/index'
import {frameInRoutes} from '@/router/routes'
import layoutHeaderAside from '@/layout/header-aside'
import $ from 'jquery'

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const routes = {}

// 格式化动态添加的路由
const formatRoutes = function (routes) {
  routes.forEach(route => {
    route.component = _import(route.component)
    if (route.children) {
      formatRoutes(route.children)
    }
  })
}

routes.init = function (router) {
  const token = util.cookies.get('token')
  if (token && token !== 'undefined') {
    const token = util.cookies.get('token')
    $.ajax({
      url: process.env.VUE_APP_BASE_API + '/users/list_user_router/v1/',
      type: 'POST',
      async: false,
      contentType: "application/json; charset=utf-8",
      headers: {
        'Authorization': 'Token ' + token
      },
      success(res) {
        if (res.code == '0') {
          // console.log(res.data.router)
          let permRoutes = res.data.router
          formatRoutes(permRoutes)
          permRoutes = [
            {
              path: '/',
              redirect: {name: 'index'},
              component: layoutHeaderAside,
              children: permRoutes
            }
          ]
          router.addRoutes(permRoutes)
          // 处理路由 得到每一级的路由设置，用于多页面的标签
          frameInRoutes[0]['children'] = [...frameInRoutes[0]['children'], ...permRoutes]
          store.commit('d2admin/page/init', frameInRoutes)
        } else {
          console.log(res.msg)
        }
      },
      error(xhr, status, errors) {
        if (xhr.status == '403') {
          console.log('权限拒绝');
        } else {
          console.log(errors);
        }
      }
    })

  }
}

export default routes
