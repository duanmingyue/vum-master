<template>
  <div class="page">
    <simple-header title="Back" :back-link="true"></simple-header>
    <!--<page-content>-->
      <div class="content-block" style="position: relative;top:85px;">
        <p><m-button type="danger" :bordered="true"  :round="true">剩余时间:{{timeHour}}时{{timeMin}}分{{timeSecond}}秒</m-button></p>
        <p><m-button @click.native="continuepurch()">继续购买</m-button></p>
      </div>
    <!--</page-content>-->
    <preloader ref="preloader"></preloader>
  </div>
</template>

<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import Icon from '../components/icons'
import { Button, ButtonGroup } from '../components/buttons'
import Http from '../../config/Http'
import deviceHttp from '../../config/deviceHttp'
import Preloader from '../components/preloader'
export default {
  data: function () {
    return {
      show: false,
      state: '',
      timeHour: '',
      timeMin: '',
      timeSecond: ''
    }
  },
  mounted () {
    this.continuedaojishi()
    var context = this
    clearInterval(this.daojis)
    this.daojis = setInterval(() => {
      context.continuedaojishi()
    }, 1000)
  },
  components: {
    SimpleHeader,
    'page-content': Content,
    Icon,
    ButtonGroup,
    'm-button': Button,
    Preloader
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
    continuedaojishi () {
      let deviceId = this.getQueryString('deviceId')
      deviceHttp.request('queryDeviceStatusInfo', {deviceId: deviceId}, 'POST', (res) => {
        this.state = res.data.startUpStatus === 0 ? '关机' : '开机'
        this.timeRemaining = res.data.timeRemaining
        this.timeHour = res.data.timeHour
        this.timeMin = res.data.timeMin
        this.timeSecond = res.data.timeSecond
        let context = this
        if (this.timeRemaining <= 1) {
          alert('时间到')
          location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a504e3c64a5af90&redirect_uri=" + encodeURIComponent("http://xiaoweishiye.usr.cn/View/?deviceId=" + context.getQueryString('deviceId') + "#/") + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
        }
      })
    },
    continuepurch () {
      location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a504e3c64a5af90&redirect_uri=" + encodeURIComponent("http://xiaoweishiye.usr.cn/View/?deviceId=" + this.getQueryString('deviceId') + "#/charge/") + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
    }

  }
}
</script>

<style scoped>
.icons {
  font-size: 24px;
  color: #3cc51f;
}
</style>
