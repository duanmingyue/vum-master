<template>
  <div class="page">
    <simple-header title="Result" :back-link="true"></simple-header>
    <page-content>
      <result type="error">
        <div slot="title">系统异常</div>
        <div slot="text">
        </div>
        <div slot="buttons">
          <!--<m-button @click.native="reback()">OK</m-button>-->
          <!--<m-button type="light">BACK</m-button>-->
        </div>
        <div slot="bottom">
          <!--<a>About This Page</a>-->
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

  export default {
    components: {
      SimpleHeader,
      'page-content': Content,
      Result,
      'm-button': Button
    }
    // methods
  }
</script>
