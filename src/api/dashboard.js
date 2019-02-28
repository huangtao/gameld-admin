import request from '@/utils/request'

export function getTotalInfo() {
  return request({
    url: '/dashboard/totalinfo',
    method: 'get'
  })
}
