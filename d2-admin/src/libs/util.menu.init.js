import request from '@/plugin/axios'
import SERVER from '@/server'
import util from '@/libs/util.js'
import store from '@/store/index'

const menu = {}

menu.init = function () {
  const token = util.cookies.get('token')
  if (token && token !== 'undefined') {
    return request({
      url: SERVER.server + '/users/list_user_menu/v1/',
      method: 'post',
    })
      .then(async res => {
        // console.log(res.menu)
        store.commit('d2admin/menu/asideSet', res.menu)
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
}

export default menu
