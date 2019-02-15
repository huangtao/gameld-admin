import request from '@/utils/request'

export function getPlayerInfo(playerid, numid) {
  return request({
    url: '/player/info',
    method: 'post',
    data: {
      playerid,
      numid
    }
  })
}

export function doPay(playerid, price, desc) {
  return request({
    url: '/player/dopay',
    method: 'post',
    data: {
      playerid,
      price,
      desc
    }
  })
}

export function mgrBox(playerid, action, value, desc) {
  return request({
    url: '/player/mgrbox',
    method: 'post',
    data: {
      playerid,
      action,
      value,
      desc
    }
  })
}

export function mgrBag(playerid, action, value, desc) {
  return request({
    url: '/player/mgrbag',
    method: 'post',
    data: {
      playerid,
      action,
      value,
      desc
    }
  })
}

export function mgrId(playerid, action) {
  return request({
    url: '/player/mgrid',
    method: 'post',
    data: {
      playerid,
      action
    }
  })
}
