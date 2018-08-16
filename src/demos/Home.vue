<template>
  <div class="my-page" id="example-2">
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
      window.addEventListener("popstate", function (e) {
        WeixinJSBridge.call('closeWindow')
      }, false)
      function pushHistory () {
        var state = {
          title: "title",
          url: "#"
        }
        window.history.pushState(state, "title", "#")
      }
      pushHistory()
      this.code = this.getQueryString('code')
      deviceHttp.request('warning/queryBindWx', {'code': this.code}, 'POST', (res) => {
        console.log(res)
        if (res.status === 0) {
          this.openId = res.data.openId
          this.phoneNum = res.data.phoneNum
          window.localStorage.setItem("openId", this.openId)
          window.localStorage.setItem("phoneNum", this.phoneNum)
          this.$router.push({name: 'phonelist'})
        } else if (res.status === 806 || res.status === 5002 || res.status === 500) {
          // this.$router.push({name: 'resulterr'})
          window.history.back()
        } else if (res.status === 5003) {
          this.openId = res.data.openId
          window.localStorage.setItem("openId", this.openId)
          this.$router.push({name: 'shouyeindex'})
        }
      })
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
      }
    }
  }
</script>
<style lang="less" scoped>
  .row {
    margin-top: 10px;
    text-align: center;
  }
</style>
