/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  //const valid_map = ['admin', 'editor']
  //return valid_map.indexOf(str.trim()) >= 0
  // 我们用数据库验证,只要是管理员账号即可
  return str.length
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
