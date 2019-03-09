<template>
  <div class="box_cont">
    <div class="logo_box">
      <img src="/static/img/yushi_logo.png" class="yushilogo">
      <p class="tishi">您还没有登录</p>
      <div class="ljdl_btn" @click="tologin">立即登录</div>
      <!--<div class="weixin_dl">-->
        <!--<img src="/static/img/weixin2.png" class="weixin_dl_logo">-->
        <!--<p class="weixin_dl_text">绑定微信后使用微信登录</p>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginBefore",
    data() {
      return {

      };
    },
    methods: {
      tologin () {
        this.$router.push({ path: "/loginsz"})
      }
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #5FB655;
  .box_cont{
    width:100%;
    min-height: 100vh;
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .logo_box{
      width:Rem(375);
      margin:0 auto;
      text-align: center;
      .yushilogo{
        width:Rem(130);
        height:Rem(111);
      }
      .tishi{
        font-size:Rem(14);
        color:#333333;
        margin-top:Rem(16);
      }
      .ljdl_btn{
        width:Rem(90);
        height:Rem(40);
        margin:0 auto;
        line-height:Rem(40);
        text-align: center;
        background: $background;
        color:#ffffff;
        font-size:Rem(15);
        margin-top:Rem(26);
      }
      .weixin_dl{
        margin-top:Rem(29);
        margin-bottom:Rem(29);
        text-align: center;
        .weixin_dl_logo{
          width:Rem(31);
          height:Rem(24);
        }
        .weixin_dl_text{
          color:#999999;
          font-size:Rem(10);
        }
      }
    }
  }
</style>
