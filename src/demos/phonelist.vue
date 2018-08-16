<template>
  <div class="page">
    <simple-header title="Result" :back-link="true"></simple-header>
    <page-content>
      <result type="success">
        <div slot="title">您已绑定的手机号</div>
        <div slot="text">
          {{phoneNum}}
        </div>
        <div slot="buttons">
          <m-button @click.native="reband()">确定解绑</m-button>
        </div>
        <div slot="bottom">
        </div>
      </result>
    </page-content>
  </div>
</template>

<script>
  import { SimpleHeader } from '../components/header'
  import Content from '../components/content'
  import { Button } from '../components/buttons'
  import Result from '../components/result'
  import deviceHttp from '../../config/deviceHttp'
  export default {
    data: function () {
      return {
        phoneNum: ''
      }
    },
    mounted () {
      pushHistory()
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
      this.openId = window.localStorage.getItem("openId")
      this.phoneNum = window.localStorage.getItem("phoneNum")
    },
    components: {
      SimpleHeader,
      'page-content': Content,
      Result,
      'm-button': Button
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
      reband () {
        deviceHttp.request('warning/unBindWx', {'openId': this.openId}, 'POST', (res) => {
          if (res.status === 0) {
            this.$router.push({name: 'rebandpage'})
          } else if (res.status === 5002) {
            this.$router.push({name: 'resulterr'})
          } else {
             alert('微信未绑定联系人')
          }
        })
      }
    }
  }
</script>
