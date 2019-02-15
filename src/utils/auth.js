import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const LoginName = 'Login-Name'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getLoginName() {
  return Cookies.get(LoginName)
}

export function setLoginName(name) {
  return Cookies.set(LoginName, name)
}

