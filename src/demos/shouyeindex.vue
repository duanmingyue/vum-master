<template>
  <div class="my-page" id="example-2">
    <!--<page-header>-->
      <!--&lt;!&ndash;<header-link></header-link>&ndash;&gt;-->
      <!--&lt;!&ndash;<header-title>微信绑定</header-title>&ndash;&gt;-->
    <!--</page-header>-->
    <page-content>
    <div class="row no-gutter">
    <div class="col-100">
    <div style="height:150px;line-height: 150px;font-size:22px">绑定手机号</div>
    </div>
    </div>
    <el-form :model="numberValidateForm" ref="numberValidateForm" placeholder="请输入要绑定的手机号" style="width:90%" label-width="35px" class="demo-ruleForm">
    <el-form-item
    prop="phone"
    :rules="[
    { required: true, message: '手机号不能为空'},
    { type: 'number', message: '手机号必须为数字值'}
    ]"
    >
    <el-input placeholder="请输入手机号" clearable type="number" v-model.number="numberValidateForm.phone" v-on:input ="inputFunc()" auto-complete="off"></el-input>
    </el-form-item>
    <div style="font-size:10px;margin-left:25px;margin-top:13px;"><span style="color:red">注:</span>绑定的手机号与消防系统填写的一致,绑定后可以接受现场告警信息</div>
    <el-form-item>
    <m-button @click.native="submitForm('numberValidateForm')" :disabled="isDisable" style="border-radius: 10px;margin:auto;margin-top:140px;">绑定</m-button>
    </el-form-item>
    </el-form>
    </page-content>
    <!--<preloader ref="preloader"></preloader>-->
  </div>
</template>
<script>
  import Grid from '../components/grid'
  import {Header, HeaderLink, HeaderTitle} from '../components/header'
  import Content from '../components/content'
  import Column from '../components/column'
  import {List, ListItem} from '../components/list'
  import Switcher from '../components/switcher'
  import {Button, ButtonGroup} from '../components/buttons'
  import Http from '../../config/Http'
  import deviceHttp from '../../config/deviceHttp'
  import Preloader from '../components/preloader'
  import Result from '../components/result'
  export default {
    data: function () {
      return {
        totleName: '',
        predact: '',
        WeixinJSBridge: '',
        show: false,
        state: '',
        timeRemaining: '',
        monn: '',
        isDisable: true,
        numberValidateForm: {
          phone: ''
        },
        appId: '',
        code: ''
      }
    },
    mounted () {
      this.openId = window.localStorage.getItem("openId")
    },
    components: {
      'page-header': Header,
      HeaderLink,
      HeaderTitle,
      'page-content': Content,
      Grid,
      Column,
      List,
      ListItem,
      Switcher,
      ButtonGroup,
      'm-button': Button,
      Preloader,
      Result
    },
    methods: {
      getQueryString: function (name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
        const r = window.location.search.substr(1).match(reg)
        if (r != null) {
          return unescape(r[2])
        }
        return null
      },
      makecheck: function (canshu) {
        this.isDisable = false
        this.monn = canshu
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isDisable = false
            deviceHttp.request('warning/bindWx', {'phoneNum': this.numberValidateForm.phone, 'openId': this.openId}, 'POST', (res) => {
              if (res.status === 'FIRE05006') {
                this.$message.error('手机号不存在')
                return
              } else if (res.status === 5005) {
                this.$message.error('手机号已绑定微信')
                return
              } else if (res.status === 5004) {
                this.$message.error('手机号已绑定微信')
                return
              } else if (res.status === 5002) {
                this.$message.error('手机号已绑定微信')
                return
              } else if (res.status === 0) {
                this.$router.push({name: 'result'})
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      inputFunc () {
        this.isDisable = false
      }
      // resetForm (formName) {
      //   this.$refs[formName].resetFields()
      // }
    }
  }
</script>
<style lang="less" scoped>
  .row {
    margin-top: 10px;
    text-align: center;
  }
</style>
