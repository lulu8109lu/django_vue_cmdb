import request from '@/plugin/axios'
import SERVER from '@/server'
import util from '@/libs/util.js'
import store from '@/store/index'
import {frameInRoutes, errorPage} from '@/router/routes'
import layoutHeaderAside from '@/layout/header-aside'

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
    return request({
      url: SERVER.server + '/users/list_user_router/v1/',
      method: 'post',
    })
      .then(res => {
          // console.log(res.router)
          let permRoutes = res.router
          formatRoutes(permRoutes)
          let redirect_404 = {path: '*', redirect: '/404', hidden: true}
          permRoutes.push(redirect_404)
          permRoutes = [
            {
              path: '/',
              redirect: {name: 'index'},
              component: layoutHeaderAside,
              children: permRoutes
            }
          ]
          router.addRoutes(permRoutes)
          frameInRoutes[0]['children'] = [...frameInRoutes[0]['children'], ...permRoutes]
          // 处理路由 得到每一级的路由设置，用于多页面的标签
          store.commit('d2admin/page/init', frameInRoutes)
        }
      )
      .catch(err => {
        console.log('err: ', err)
      })
  }
}

export default routes
