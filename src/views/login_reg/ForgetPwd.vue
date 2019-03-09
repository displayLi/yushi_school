<template>
  <div class="box_cont">
    <div class="logo_box">
      <img src="/static/img/yushi_logo.png" class="yushilogo">
      <div class="input_box">
        <div class="input_item">
          <img src="/static/img/phone_img.png" style="width:12px;height:21px;margin-left:10px;">
          <input type="text" v-model="mobile" placeholder="输入您的手机号或系统注册码">
        </div>
        <div class="input_item">
          <img src="/static/img/yzm.png"  style="width:14px;height:17px;margin-left:8px;">
          <input type="text" v-model="checkcode" placeholder="验证码" style="width:180px;">
          <span class="hqyzm" v-show="isshowsend" @click="sendcode">{{yzm}}</span>
          <span class="hqyzm" v-show="!isshowsend">{{sendSecondCount}}s</span>
        </div>
        <div class="input_item">
          <img src="/static/img/mima_img.png" style="width:14px;height:19px;margin-left:8px;">
          <input type="password" v-model="password" placeholder="请输入您的新密码">
        </div>
        <div class="input_item">
          <img src="/static/img/mima_img.png" style="width:14px;height:19px;margin-left:8px;">
          <input type="password" v-model="repassword" placeholder="请再次输入新密码">
        </div>
        <div class="denglu" @click="toxiugai">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  export default {
    name: "ForgetPwd",
    data() {
      return {
        yzm: '获取验证码',
        sendSecondCount: 60,
        isshowsend: true,
        mobile: '',
        checkcode:'',
        password:'',
        repassword:''
      };
    },
    methods: {
      sendcode () {
        if (this.mobile) {
          if (this.sendSecondCount == 60) {
            this.isshowsend = false
            this.sendTimeMark = setInterval(() => {
              this.sendSecondCount--;
              if (this.sendSecondCount < 0) {
                clearInterval(this.sendTimeMark);
                this.sendTimeMark = null;
                this.isshowsend = true
                this.sendSecondCount = 60;
              }
            }, 1000);
          }
          this.axios
            .post("/api/getCode", {
              phone: this.mobile
            })
            .then(data => {
              console.log('123',data);
            });
        } else {
          this.tos('请输入手机号')
        }
      },
      tos (test) {
        Toast({message: test, position: 'top', duration: 2000});
      },
      toxiugai () {
        let self = this;
        let regs=[self.mobile,self.checkcode,self.password,self.repassword]
        let tishiyu=['请输入您的手机号','请输入验证码','请输入密码','请再次输入密码']
        for (let i=0;i<regs.length;i++) {
          if (!regs[i]) {
            this.tos(tishiyu[i])
            return
          } else {
            if (regs[3]!==regs[2]) {
              this.tos('两次输入密码不一致')
              return
            }
          }
        }
        let obj = {
          phone: self.mobile,
          code:self.checkcode,
          password: self.password,
          repassword:self.repassword
        };
        this.axios.post("/api/changePassword", obj).then(data => {
          self.tos('密码修改成功')
          self.$router.replace({path:"/loginsz"})
        });
      }
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
          position: relative;
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
          span.hqyzm{
            display: inline-block;
            height: Rem(36);
            line-height: Rem(36);
            font-size: Rem(12);
            color: $background;
            text-align: center;
            position: absolute;
            top: Rem(0);
            right: Rem(23);
          }
        }
        .denglu{
          margin:0 auto;
          margin-bottom:Rem(100);
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
  }
</style>
