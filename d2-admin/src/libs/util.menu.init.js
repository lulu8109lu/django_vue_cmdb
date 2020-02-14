import request from '@/plugin/axios'
import SERVER from '@/server'
import util from '@/libs/util.js'
import store from '@/store/index'
import menuAside from '@/menu/aside'

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
        let allMenu = [...menuAside, ...res.menu]
        store.commit('d2admin/menu/asideSet', allMenu)
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }
}

export default menu
