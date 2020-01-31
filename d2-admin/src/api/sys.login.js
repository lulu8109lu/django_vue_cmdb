import request from '@/plugin/axios'
import SERVER from '@/server'

export function AccountLogin (data) {
  return request({
    url: SERVER.server + '/users/auth/v1/',
    // url: '/login',
    method: 'post',
    data,
  })
}
