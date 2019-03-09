<template>
  <div class="box_cont">
    <div class="logo_box">
      <img src="/static/img/yushi_logo.png" class="yushilogo">
      <div class="input_box">
        <div class="input_item" v-show="jsnum==1">
          <input type="text" v-model="uName" readonly="readonly" style="margin-left:16px;">
        </div>
        <div class="input_item">
          <input type="text" v-model="schName" readonly="readonly" style="margin-left:16px;">
        </div>
        <div class="input_item">
          <img src="/static/img/phone_img.png" style="width:12px;height:21px;margin-left:10px;">
          <input type="text" v-model="mobile" placeholder="输入您的手机号">
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
          <input type="password" v-model="password2" placeholder="请再次输入新密码">
        </div>
        <div class="yanzheng" @click="toreg33">注册</div>
        <div class="reg_xieyi" @click="chosexieyi" style="margin-bottom:40px;">
          <span class="kuang" v-if="!actxieyi"></span>
          <img src="/static/img/kexuanxieyi.png" v-else class="kuang_img">
          同意《与时校园用户注册协议》
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from "mint-ui";
  export default {
    name: "Register3",
    data() {
      return {
        yzm: '获取验证码',
        sendSecondCount: 60,
        isshowsend: true,
        mobile: "",
        actxieyi:true,
        jsnum:'',
        uName:'',
        schName:'',
        dataobjreg:{}
      }
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
      chosexieyi () {
        this.actxieyi=!this.actxieyi
      },
      toreg33 () {
        let regs=[this.mobile,this.checkcode,this.password,this.password2]
        let tishiyu=['请输入您的手机号','请输入验证码','请输入密码','请再次输入密码']
        for (let i=0;i<regs.length;i++) {
          if (!regs[i] || regs[i]=='') {
            this.tos(tishiyu[i])
            return false
          }
        }
        if (this.password2!==this.password) {
          this.tos('两次输入密码不一致')
          return false
        }
        if (!this.actxieyi) {
          this.tos('请同意《与时校园用户注册协议》')
          return false
        }
        this.dataobjreg=JSON.parse(sessionStorage.getItem("dataobjreg"))
        this.dataobjreg.phone=this.mobile
        this.dataobjreg.code=this.checkcode
        this.dataobjreg.password=this.password
        this.dataobjreg.repassword=this.password2
        this.tozhuce()
      },
      tozhuce(){
        let self = this;
        self.axios.post("/api/register", self.dataobjreg).then(data => {
          self.tos('注册成功')
          self.$router.replace({path:"/loginsz"});
        });
      },
    },
    mounted () {
      this.jsnum = window.sessionStorage.getItem('jsnum')
      let yanzhengInfo=JSON.parse(sessionStorage.getItem("yanzhengInfo"))
      if (this.jsnum==1) {
        this.uName=yanzhengInfo.userName
        this.schName=yanzhengInfo.schoolName+yanzhengInfo.academicYear+yanzhengInfo.category+yanzhengInfo.num+'班'
      } else if (this.jsnum==3) {
        this.schName=yanzhengInfo.name
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #5FB655;
  $bordercolor:#EEEEEE;
  .box_cont {
    width: 100%;
    min-height: 100vh;
    background: #FAFAFA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .logo_box {
      width: Rem(375);
      margin: 0 auto;
      text-align: center;
      .yushilogo {
        width: Rem(130);
        height: Rem(111);
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
      }
    }
  }
</style>
