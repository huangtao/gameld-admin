<template>
  <div class="app-container">
    <el-form ref="playerForm" :model="playerForm" label-width="80px">
      <el-form-item label="文字账号:">
        <el-input v-model="playerForm.playerid" placeholder="文字账号"/>
      </el-form-item>
      <el-form-item label="数字账号:">
        <el-input v-model="playerForm.numid" placeholder="数字账号"/>
      </el-form-item>
      <el-form-item>
        <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="playerinfoForm1" :model="playerForm" label-width="80px">
      <el-form-item label="昵称:">
        <el-input v-model="nickname" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="钻石:">
        <el-input v-model="diamond" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="充钻石:">
        <el-button class="filter-item" type="primary" @click="payDiamond(5)">5元</el-button>
        <el-button class="filter-item" type="primary" @click="payDiamond(10)">10元</el-button>
      </el-form-item>
      <el-form-item v-show="isadmin">
        <el-button class="filter-item" type="primary" @click="payDiamond(20)">20元</el-button>
        <el-button class="filter-item" type="primary" @click="payDiamond(50)">50元</el-button>
      </el-form-item>
      <el-form-item v-show="isadmin">
        <el-button class="filter-item" type="primary" @click="payDiamond(100)">100元</el-button>
      </el-form-item>
      <el-form-item label="银子:">
        <el-input v-model="gold" :disabled="edit"/>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onGoldZero">清零</el-button>
      </el-form-item>
      <el-form-item label="保险箱:">
        <el-input v-model="boxGold" :disabled="edit"/>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onBankZero">清零</el-button>
      </el-form-item>
      <el-form-item label="充值:">
        <el-button class="filter-item" type="primary" @click="doPay(5)">5元</el-button>
        <el-button class="filter-item" type="primary" @click="doPay(10)">10元</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="filter-item" type="primary" @click="doPay(20)">20元</el-button>
        <el-button v-show="isadmin" class="filter-item" type="primary" @click="doPay(50)">50元</el-button>
      </el-form-item>
      <el-form-item v-show="isadmin">
        <el-button class="filter-item" type="primary" @click="doPay(100)">100元</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="playerinfoForm2" :model="playerForm" label-width="90px">
      <el-form-item v-show="isadmin" label="保险箱增减:">
        <el-input v-model="playerForm.boxJJNum" placeholder="请输入增减数额"/>
      </el-form-item>
      <el-form-item>
        <el-button v-show="isadmin" type="danger" @click="onBankJJ">执行增减</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onDelBankPwd">删除保险箱密码</el-button>
      </el-form-item>

      <el-form-item label="勤劳奖章:">
        <el-input v-model="qljz" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="奖章增减:">
        <el-input v-model="playerForm.qljzJJNum" placeholder="请输入增减数额"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQljzJJ">执行增减</el-button>
      </el-form-item>

      <el-form-item label="性别:">
        <el-input v-model="sex" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="电子邮件:">
        <el-input v-model="email" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="提示问题:">
        <el-input v-model="question" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="答案:">
        <el-input v-model="answer" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="真实姓名:">
        <el-input v-model="realname" :disabled="edit"/>
      </el-form-item>
      <el-form-item label="身份证:">
        <el-input v-model="sid" :disabled="edit"/>
      </el-form-item>

      <el-form-item label="修改密码:">
        <el-input v-model="playerForm.newpassword" placeholder="请输入新密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onChangePwd">密码更改</el-button>
      </el-form-item>
      <el-form-item label="机器码:">
        <el-input v-model="machinecode" :disabled="edit"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSMAccount">关联账号</el-button>
      </el-form-item>

      <el-form-item label="冻结">
        <el-checkbox v-model="frozened" :disabled="edit"/>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="onFUAccount"><span>{{ smtitle }}</span></el-button>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="dialogVisible" title="确认" width="50%">
      <span>
        <el-input v-model="temp_desc" placeholder="请输入说明"/>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDiagOk">立即执行</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      fullscreenLoading: false,
      edit: true,
      dialogVisible: false,
      temp_type: '',
      temp_price: 0,
      temp_desc: '',
      playerForm: {
        playerid: '',
        numid: '',
        boxJJNum: '',
        qljzJJNum: '',
        newpassword: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),
    nickname() {
      return this.$store.state.player.nickname
    },
    sex() {
      return this.$store.state.player.sex
    },
    diamond() {
      return this.$store.state.player.diamond
    },
    gold() {
      return this.$store.state.player.gold
    },
    boxGold() {
      return this.$store.state.player.boxGold
    },
    qljz() {
      return this.$store.state.player.qljz
    },
    email() {
      return this.$store.state.player.email
    },
    question() {
      return this.$store.state.player.question
    },
    answer() {
      return this.$store.state.player.answer
    },
    realname() {
      return this.$store.state.player.realname
    },
    sid() {
      return this.$store.state.player.sid
    },
    machinecode() {
      return this.$store.state.player.machinecode
    },
    frozened() {
      if (this.$store.state.player.permission === 4) {
        return true
      } else {
        return false
      }
    },
    smtitle() {
      if (this.$store.state.player.permission === 4) {
        return '解封'
      } else {
        return '封号'
      }
    },
    isadmin() {
      if (this.roles.indexOf('admin') >= 0) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.$store.commit('CLEAR_DATA')
  },
  methods: {
    onSubmit() {
      this.fullscreenLoading = true
      const queryPlayer = { playerid: this.playerForm.playerid, numid: this.playerForm.numid }
      this.$store.dispatch('GetPlayerInfo', queryPlayer).then(() => {
        this.fullscreenLoading = false
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message('获取账号信息失败!')
      })
    },
    onDelBankPwd() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      const reqData = {
        playerid: this.$store.state.player.playerid,
        action: 3,
        value: 0,
        desc: ''
      }
      this.$store.dispatch('MgrBox', reqData).then(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作成功!', type: 'success' })
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作失败!', type: 'success' })
      })
    },
    onGoldZero() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      const reqData = {
        playerid: this.$store.state.player.playerid,
        action: 1,
        value: 0,
        desc: ''
      }
      this.$store.dispatch('MgrBag', reqData).then(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作成功!', type: 'success' })
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作失败!', type: 'success' })
      })
    },
    onBankZero() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      const reqData = {
        playerid: this.$store.state.player.playerid,
        action: 2,
        value: 0,
        desc: ''
      }
      this.$store.dispatch('MgrBox', reqData).then(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作成功!', type: 'success' })
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作失败!', type: 'success' })
      })
    },
    onBankJJ() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      this.temp_type = 'gold_change'
      this.temp_desc = ''
      this.dialogVisible = true
    },
    onQljzJJ() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      this.temp_type = 'qljz'
      this.temp_desc = ''
      this.dialogVisible = true
    },
    onChangePwd() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      this.fullscreenLoading = true
      const reqData = {
        playerid: this.$store.state.player.playerid,
        password: this.playerForm.newpassword
      }
      this.$store.dispatch('MgrPwd', reqData).then(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作成功!', type: 'success' })
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作失败!', type: 'success' })
      })
    },
    onFUAccount() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      const reqData = {
        playerid: this.$store.state.player.playerid,
        action: 1
      }
      if (this.$store.state.player.permission === 4) {
        reqData.action = 2
      }
      this.$store.dispatch('MgrId', reqData).then(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作成功!', type: 'success' })
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message({ message: '操作失败!', type: 'success' })
      })
    },
    onSMAccount() {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      if (this.$store.state.player.machinecode.length === 0 ||
          this.$store.state.player.machinecode === 'web') {
        this.$message.warning('无特征网卡!')
        return
      }
      const reqData = {
        machinecode: this.$store.state.player.machinecode
      }
      this.fullscreenLoading = true
      this.$store.dispatch('MachineAccount', reqData).then(() => {
        this.fullscreenLoading = false
      }).catch(() => {
        this.fullscreenLoading = false
        this.$message({ message: '查询失败!', type: 'success' })
      })
    },
    payDiamond(price) {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      this.temp_type = 'diamond'
      this.temp_price = price
      this.temp_desc = ''
      this.dialogVisible = true
    },
    doPay(price) {
      if (this.$store.state.player.playerid === '') {
        this.$message.warning('查询账号后才能操作!')
        return
      }
      this.temp_type = 'gold_pay'
      this.temp_price = price
      this.temp_desc = ''
      this.dialogVisible = true
    },
    handleDiagOk() {
      if (this.temp_desc.length === 0) {
        this.$message.error('必须输入说明!')
        return
      }
      this.dialogVisible = false

      this.fullscreenLoading = true
      if (this.temp_type === 'gold_pay') {
        // 银子充值
        const reqData = {
          playerid: this.$store.state.player.playerid,
          price: this.temp_price,
          is_yz: 1,
          desc: this.temp_desc
        }
        this.$store.dispatch('DoPay', reqData).then(() => {
          this.fullscreenLoading = false
          this.$message({ message: '充值成功!', type: 'success' })
        }).catch(() => {
          this.fullscreenLoading = false
          this.$message({ message: '充值失败!', type: 'error' })
        })
      } else if (this.temp_type === 'gold_change') {
        // 改变银子
        const reqData = {
          playerid: this.$store.state.player.playerid,
          action: 1,
          value: this.playerForm.boxJJNum,
          desc: this.temp_desc
        }
        this.$store.dispatch('MgrBox', reqData).then(() => {
          this.fullscreenLoading = false
          this.$message({ message: '操作成功!', type: 'success' })
        }).catch(() => {
          this.fullscreenLoading = false
          this.$message({ message: '操作失败!', type: 'success' })
        })
      } else if (this.temp_type === 'diamond') {
        // 钻石充值
        const reqData = {
          playerid: this.$store.state.player.playerid,
          price: this.temp_price,
          is_yz: 0,
          desc: this.temp_desc
        }
        this.$store.dispatch('DoPay', reqData).then(() => {
          this.fullscreenLoading = false
          this.$message({ message: '充钻石成功!', type: 'success' })
        }).catch(() => {
          this.fullscreenLoading = false
          this.$message({ message: '充钻石失败!', type: 'error' })
        })
      } else if (this.temp_type === 'qljz') {
        const reqData = {
          playerid: this.$store.state.player.playerid,
          flag: 2,
          value: this.playerForm.qljzJJNum,
          desc: this.temp_desc
        }
        this.$store.dispatch('JFOP', reqData).then(() => {
          this.fullscreenLoading = false
          this.$message({ message: '操作成功!', type: 'success' })
        }).catch(() => {
          this.fullscreenLoading = false
          this.$message({ message: '操作失败!', type: 'success' })
        })
      } else {
        return
      }
    }
  }
}
</script>

<style scoped>
.field-label{
  vertical-align: middle;
}
.line{
  text-align: center;
}
.block {
  padding: 30px 24px;
}
</style>

