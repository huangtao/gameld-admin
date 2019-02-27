import { getPlayerInfo, doPay, mgrBox, mgrBag, mgrId, machineAccount, payHistroy, jfOP } from '@/api/player'

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
    permission: 0,
    machineAccount: [],
    payHistroy: []
  },

  mutations: {
    RESET: (state) => {
      state.playerid = ''
      state.nickname = ''
      state.numid = ''
      state.sex = 0
      state.gold = 0
      state.boxGold = 0
      state.diamond = 0
      state.qljz = 0
      state.email = ''
      state.question = ''
      state.answer = ''
      state.machinecode = ''
      state.realname = ''
      state.sid = ''
      state.permission = 0
      state.machineAccount = []
      state.payHistroy = []
    },
    SET_DATA: (state, data) => {
      state.playerid = data.playerid
      state.nickname = data.nickname
      state.sex = data.sex
      state.gold = data.gold
      state.boxGold = data.boxGold
      state.diamond = data.diamond
      state.qljz = data.qljz
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
    SET_QLJZ: (state, newjf) => {
      state.qljz = newjf
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission
    },
    SET_MACHINEACCOUNT: (state, result) => {
      state.machineAccount = result
    },
    SET_PAYHISTROY: (state, result) => {
      state.payHistroy = result
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

    // 相同网卡账号
    MachineAccount({ commit }, reqData) {
      const machinecode = reqData.machinecode.trim()
      return new Promise((resolve, reject) => {
        machineAccount(machinecode).then(response => {
          const data = response.data
          commit('SET_MACHINEACCOUNT', data.result)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 充值历史
    PayHistroy({ commit }, reqData) {
      const playerid = reqData.playerid.trim()
      return new Promise((resolve, reject) => {
        payHistroy(playerid).then(response => {
          const data = response.data
          commit('SET_PAYHISTROY', data.result)
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

    // 积分/勤劳奖章
    JFOP({ commit }, reqData) {
      const playerid = reqData.playerid.trim()
      return new Promise((resolve, reject) => {
        jfOP(playerid, reqData.flag, reqData.value).then(response => {
          const data = response.data
          if (data.dbret !== 1) {
            reject('db return failed!')
          }
          if (reqData.flag === 2) {
            commit('SET_QLJZ', data.newjf)
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
