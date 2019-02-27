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

export function mgrPwd(playerid, password) {
  return request({
    url: '/player/mgrpwd',
    method: 'post',
    data: {
      playerid,
      password
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

export function jfOP(playerid, flag, value) {
  return request({
    url: '/player/jfop',
    method: 'post',
    data: {
      playerid,
      flag,
      value
    }
  })
}

export function machineAccount(machinecode) {
  return request({
    url: '/player/machineaccount',
    method: 'post',
    data: {
      machinecode
    }
  })
}

export function payHistroy(playerid) {
  return request({
    url: '/player/payhistroy',
    method: 'post',
    data: {
      playerid
    }
  })
}
