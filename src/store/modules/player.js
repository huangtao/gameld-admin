import { getPlayerInfo, doPay, mgrBox, mgrBag, mgrId } from '@/api/player'

const player = {
  state: {
    playerid: '',
    nickname: '',
    numid: '',
    sex: 0,
    email: '',
    diamond: 0,
    gold: 0,
    boxGold: 0,
    qljz: 0,
    question: '',
    answer: '',
    avatar: '',
    machinecode: '',
    realname: '',
    sid: '',
    permission: 0
  },

  mutations: {
    SET_DATA: (state, data) => {
      state.playerid = data.playerid
      state.nickname = data.nickname
      state.sex = data.sex
      state.gold = data.gold
      state.boxGold = data.boxGold
      state.email = data.email
      state.question = data.question
      state.answer = data.answer
      state.machinecode = data.machinecode
      state.realname = data.realname
      state.sid = data.sid
      state.permission = data.permission
    },
    SET_GOLD: (state, gold) => {
      state.gold = gold
    },
    SET_BOXGOLD: (state, boxGold) => {
      state.boxGold = boxGold
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission
    }
  },

  actions: {
    // 获取账号信息
    GetPlayerInfo({ commit }, reqData) {
      const playerid = reqData.playerid.trim()
      const numid = reqData.numid.trim()
      return new Promise((resolve, reject) => {
        getPlayerInfo(playerid, numid).then(response => {
          const data = response.data
          if (data.dbret !== 1) {
            reject('db return failed!')
          }
          commit('SET_DATA', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 保险箱操作
    MgrBox({ commit }, reqData) {
      const playerid = reqData.playerid.trim()
      return new Promise((resolve, reject) => {
        mgrBox(playerid, reqData.action, reqData.value, reqData.desc).then(response => {
          const data = response.data
          if (data.dbret !== 1) {
            reject('db return failed!')
          }
          if (reqData.action === 1 || reqData.action === 2) {
            commit('SET_BOXGOLD', data.boxGold)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 钱包清零,给虚拟物品
    MgrBag({ commit }, reqData) {
      const playerid = reqData.playerid.trim()
      return new Promise((resolve, reject) => {
        mgrBag(playerid, reqData.action, reqData.value, reqData.desc).then(response => {
          const data = response.data
          if (data.dbret !== 1) {
            reject('db return failed!')
          }
          if (reqData.action === 1) {
            commit('SET_GOLD', data.gold)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 钱包清零,给虚拟物品
    MgrId({ commit }, reqData) {
      const playerid = reqData.playerid.trim()
      return new Promise((resolve, reject) => {
        mgrId(playerid, reqData.action).then(response => {
          const data = response.data
          if (data.dbret !== 1) {
            reject('db return failed!')
          }
          if (reqData.action === 1) {
            commit('SET_PERMISSION', 4)
          } else if (reqData.action === 2) {
            commit('SET_PERMISSION', 0)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 充值
    DoPay({ commit }, reqData) {
      const playerid = reqData.playerid.trim()
      return new Promise((resolve, reject) => {
        doPay(playerid, reqData.price, reqData.desc).then(response => {
          const data = response.data
          if (data.dbret === 1) {
            commit('SET_BOXGOLD', data.boxGold)
          } else {
            reject('db return failed!')
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default player
