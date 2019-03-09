<template>
  <div class="box_cont">
    <div class="logo_box">
      <img src="/static/img/yushi_logo.png" class="yushilogo">
      <div class="input_box">
        <div class="input_item">
          <img src="/static/img/phone_img.png" style="width:12px;height:21px;margin-left:10px;">
          <input type="text" v-model="username" placeholder="输入您的手机号或系统注册码">
        </div>
        <div class="input_item">
          <img src="/static/img/mima_img.png" style="width:14px;height:19px;margin-left:8px;">
          <input type="password" v-model="password" placeholder="输入您的密码">
        </div>
        <div class="denglu" @click="login">登录</div>
      </div>
    </div>
    <div class="login_bott">
      <span @click="forgetpwd">忘记密码</span>
      <span @click="reg">注册账号</span>
    </div>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      tos (test) {
        Toast({message: test, position: 'top', duration: 2000});
      },
      login () {
        let self = this
        let obj = {
          username: this.username,
          password: this.password
          // username: '13401011411',
          // password: '120626'
        };
        if (!this.username || !this.password) {
          this.tos("用户名或密码不能为空");
          return;
        }
        this.axios.post("/api/oauth", obj).then(data => {
          if(data.userInfo.role_type==5||data.userInfo.role_type==6||data.userInfo.role_type==7){
            data.userInfo.role_type=3
          }else if (data.userInfo.role_type==2||data.userInfo.role_type==3||data.userInfo.role_type==4){
            data.userInfo.role_type=2
          }else{
            data.userInfo.role_type=1
          }

          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo));
          console.log("role_type", data.userInfo.role_type);
          self.$router.push({ path: "/ketang"})
        });
      },
      forgetpwd () {
        this.$router.push({ path: "/forgetpwdsz"})
      },
      reg () {
        this.$router.push({ path: "/registersz"})
      },
    },
    mounted () {

    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #5FB655;
  $bordercolor:#EEEEEE;
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
      .input_box{
        margin-top:Rem(20);
        text-align: left;
        .input_item{
          margin:0 auto;
          margin-bottom:Rem(12);
          width:Rem(340);
          height:Rem(39);
          line-height:Rem(39);
          border:Rem(1) solid $bordercolor;
          border-radius: Rem(2);
          img{
            position:relative;
            top:Rem(-4);
          }
          input{
            border:none;
            outline: none;
            width:Rem(280);
            height:Rem(36);
            line-height:Rem(36);
            font-size:Rem(12);
            margin-left:Rem(2);
            position:relative;
            top:Rem(-4);
            background: transparent;
          }
          input::placeholder{
            color:#999999;
            font-size:Rem(12);
          }
        }
        .denglu{
          margin:0 auto;
          margin-bottom:Rem(150);
          width:Rem(340);
          height:Rem(39);
          line-height:Rem(39);
          border-radius: Rem(2);
          text-align: center;
          background: $background;
          font-size:Rem(15);
          color:#ffffff;
        }
      }
    }
    .login_bott{
      position:absolute;
      bottom:Rem(17);
      left:Rem(45);
      width:Rem(290);
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      span{
        font-size:Rem(15);
        color:#666666;
      }
    }
  }
</style>
