import {Message, MessageBox} from 'element-ui'
import util from '@/libs/util.js'
import router from '@/router'
import menuAside from '@/menu/aside'
import {frameInRoutes} from '@/router/routes'
import {AccountLogin} from '@api/sys.login'
import layoutHeaderAside from '@/layout/header-aside'
// store
import store from '@/store/index'

const _import = require('@/libs/util.import.' + process.env.NODE_ENV)


// 格式化后端返回的路由数据
const formatRoutes = function (routes) {
  routes.forEach(route => {
    route.component = _import(route.component)
    if (route.children) {
      formatRoutes(route.children)
    }
  })
}

export default {
  store,
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload captcha {String} 验证码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    login({dispatch}, {
      username = '',
      password = '',
      code = '',
      image_uuid
    } = {}) {
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        AccountLogin({
          username,
          password,
          code,
          image_uuid
        })
          .then(async res => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            util.cookies.set('uuid', res.uuid)
            util.cookies.set('token', res.token)
            // 设置侧边栏菜单
            // permMenu是后台返回的登录用户拥有权限访问的菜单
            // freeMenuAside是所有用户都有权限访问的菜单
            let permMenu = res.menu
            let freeMenuAside = menuAside
            let allMenu = [...freeMenuAside, ...permMenu]
            store.commit('d2admin/menu/asideSet', allMenu)
            // 设置路由
            let permRoutes = res.router
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
            frameInRoutes[0]['children'] = [...frameInRoutes[0]['children'], ...permRoutes]
            store.commit('d2admin/page/init', frameInRoutes)
            // 初始化菜单搜索功能
            store.commit('d2admin/search/init', allMenu)
            // 设置 vuex 用户信息
            await dispatch('d2admin/user/set', {
              name: res.name
            }, {root: true})
            // 用户登录后从持久化数据加载一系列的设置
            await dispatch('load')
            // 结束
            resolve()
          })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout({commit, dispatch}, {confirm = false} = {}) {
      /**
       * @description 注销
       */
      async function logout() {
        // 删除cookie
        util.cookies.remove('token')
        util.cookies.remove('uuid')
        // 清空 vuex 用户信息
        await dispatch('d2admin/user/set', {}, {root: true})
        // 跳转路由
        router.push({
          name: 'login'
        })
      }

      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, {root: true})
        MessageBox.confirm('确定要注销当前用户吗', '注销用户', {
          type: 'warning'
        })
          .then(() => {
            commit('d2admin/gray/set', false, {root: true})
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, {root: true})
            Message({
              message: '取消注销操作'
            })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    load({dispatch}) {
      return new Promise(async resolve => {
        // DB -> store 加载用户名
        await dispatch('d2admin/user/load', null, {root: true})
        // DB -> store 加载主题
        await dispatch('d2admin/theme/load', null, {root: true})
        // DB -> store 加载页面过渡效果设置
        await dispatch('d2admin/transition/load', null, {root: true})
        // DB -> store 持久化数据加载上次退出时的多页列表
        await dispatch('d2admin/page/openedLoad', null, {root: true})
        // DB -> store 持久化数据加载侧边栏折叠状态
        await dispatch('d2admin/menu/asideCollapseLoad', null, {root: true})
        // DB -> store 持久化数据加载全局尺寸
        await dispatch('d2admin/size/load', null, {root: true})
        // DB -> store 持久化数据加载颜色设置
        await dispatch('d2admin/color/load', null, {root: true})
        // end
        resolve()
      })
    }
  }
}
