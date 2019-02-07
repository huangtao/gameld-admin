<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item label="文字账号:">
            <el-input v-model="form.userid" placeholder="请输入文字账号"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数字账号:">
            <el-input v-model="form.numid" placeholder="请输入数字账号"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item label="昵称:">
            <el-input v-model="form.nickname" :disabled="edit"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="性别:">
            <el-input v-model="form.sex" :disabled="edit"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="电子邮件:">
            <el-input v-model="form.email" :disabled="edit"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="10">
          <el-form-item label="提示问题:">
            <el-input v-model="form.question" :disabled="edit"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="答案:">
            <el-input v-model="form.answer" :disabled="edit"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="10">
          <el-form-item label="真实姓名:">
            <el-input v-model="form.realname" :disabled="edit"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="身份证:">
            <el-input v-model="form.sid" :disabled="edit"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item label="钻石:">
            <el-input v-model="form.realname" :disabled="edit"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="勤劳奖章:">
            <el-input v-model="form.sid" :disabled="edit"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item label="银子:">
            <el-input v-model="form.gold" :disabled="edit"/>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="onGoldZero">清零</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="保险箱银子:">
            <el-input v-model="form.boxGold" :disabled="edit"/>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="onBankZero">清零</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onDelBankPwd">删除保险箱密码</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="6">
          <el-form-item label="保险箱增减:">
            <el-input v-model="form.boxJJNum" placeholder="请输入增减数额"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onBankJJ">执行增减</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="修改登录密码:">
            <el-input v-model="form.newpassword" placeholder="请输入新密码"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onChangePwd">密码更改</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="勤劳奖章增减:">
            <el-input v-model="form.qljz" placeholder="请输入增减数额"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQljzJJ">执行增减</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="10">
          <el-form-item label="机器码:">
            <el-input v-model="form.machinecode" :disabled="edit"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="onSMAccount">关联账号</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>充值</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="text-center">
            <el-button class="filter-item" type="primary" @click="doPay(5)">5元</el-button>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-button class="filter-item" type="primary" @click="doPay(10)">10元</el-button>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-button class="filter-item" type="primary" @click="doPay(20)">20元</el-button>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-button class="filter-item" type="primary" @click="doPay(50)">50元</el-button>
          </el-col>
          <el-col :span="4" class="text-center">
            <el-button class="filter-item" type="primary" @click="doPay(100)">100元</el-button>
          </el-col>
        </div>
      </el-card>
    </el-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: true,
      form: {
        userid: '',
        numid: '',
        nickname: '',
        sex: '',
        email: '',
        question: '',
        answer: '',
        realname: '',
        sid: '',
        diamond: '',
        gold: '',
        boxGold: '',
        boxJJNum: '',
        qljz: '',
        newpassword: '',
        machinecode: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onDelBankPwd() {
    },
    onGoldZero() {

    },
    onBankZero() {

    },
    onBankJJ() {

    },
    onChangePwd() {

    },
    onSMAccount() {

    },
    doPay(price) {

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

