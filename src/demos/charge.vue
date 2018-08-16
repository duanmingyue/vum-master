<template>
  <div class="my-page" id="example-2">
    <!--<page-header>-->
      <!--<header-link>快净吧</header-link>-->
      <!--&lt;!&ndash;<header-title>VUM</header-title>&ndash;&gt;-->
    <!--</page-header>-->
    <page-content>
      <div class="row no-gutter">
        <div class="col-100">
          <img src="../assets/images/home/tu.jpg" alt="" style="width: 90px;margin-top:50px;">
          <h5>欢迎使用重庆小为实业共享空气净化器</h5>
        </div>
      </div>
      <div class='content-padded' id="list">
        <list>
          <list-item :radio="true" v-for="item in totleName" :key="item.playpackageId"
                     @click.native="makecheck(item.playpackageId)">
            <input type="radio" name="gender">
            <!--<div class="item-media"><img src="../assets/images/icon-list.png" width="44"></div>-->
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title">{{item.name}}</div>
                <div class="item-after">{{item.price/100}}元</div>
              </div>
            </div>
          </list-item>
        </list>
      </div>
      <div>
        <footer class="content-block">
          <!--<router-link :to="{ name: 'icons' }">-->
          <p>
            <m-button @click.native="makepay()" :disabled="isDisable">确认支付</m-button>
          </p>
          <!--</router-link>-->
        </footer>
      </div>
    </page-content>
    <preloader ref="preloader"></preloader>
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

  export default {
    data: function () {
      return {
        totleName: '',
        predact: '',
        WeixinJSBridge: '',
        show: false,
        state: '',
        timeRemaining: '',
        isDisable: true
      }
    },
    mounted () {
      Http.request('playpackage/queryPlaypackageListForPlayer', {deviceId:this.getQueryString("deviceId")}, 'POST', (res) => {
        if (res.status !== 200) {
          alert(res.info)
        }
        this.totleName = res.data.packageList
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
      makecheck: function (canshu) {
        this.isDisable = false
        this.monn = canshu
      },
      makepay: function () {
        if (this.monn === undefined) {
          alert('请选择套餐')
          return
        }
        this.$refs.preloader.open()
        // clearTimeout(this.timeout)
        // this.timeout = setTimeout(() => {
        //   this.$refs.preloader.close()
        // }, 3900)
        deviceHttp.request('scanPay', {
          deviceId: this.getQueryString('deviceId'),
          playerCode: this.getQueryString('code'),
          packageId: this.monn,
          payType: 0,
          channel: 1
        }, 'POST', (res) => {
          let context = this
          this.$refs.preloader.close()
          if (res.status !== 200) {
            alert(res.info)
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a504e3c64a5af90&redirect_uri=" + encodeURIComponent("http://xiaoweishiye.usr.cn/View/?deviceId=" + context.getQueryString('deviceId') + "#/charge/") + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
            return
          }
          function onBridgeReady () {
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest', {
                appId: res.data.appId,
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign
              },
              function (r) {
                if (r.err_msg === 'get_brand_wcpay_request:cancel') {
                  location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a504e3c64a5af90&redirect_uri=" + encodeURIComponent("http://xiaoweishiye.usr.cn/View/?deviceId=" + context.getQueryString('deviceId') + "#/charge/") + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
                } else if (r.err_msg === 'get_brand_wcpay_request:ok') {
                  location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a504e3c64a5af90&redirect_uri=" + encodeURIComponent("http://xiaoweishiye.usr.cn/View/?deviceId=" + context.getQueryString('deviceId') + "#/icons/") + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
                } else {
                  alert('微信返回' + JSON.stringify(r))
                  location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2a504e3c64a5af90&redirect_uri=" + encodeURIComponent("http://xiaoweishiye.usr.cn/View/?deviceId=" + context.getQueryString('deviceId') + "#/charge/") + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect"
                }
              }
            )
          }
          onBridgeReady()
        })
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
