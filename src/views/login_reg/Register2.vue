<template>
  <div class="box_cont">
    <div class="logo_box">
      <img src="/static/img/yushi_logo.png" class="yushilogo">
      <!--学生-->
      <div class="input_box" v-if="jsnum==1">
        <div class="input_item">
          <img src="/static/img/phone_img.png" style="width:12px;height:21px;margin-left:10px;">
          <input type="text" v-model="username" placeholder="输入系统注册码">
        </div>
        <div class="yanzheng" @click="toyanzheng">验证</div>
        <div class="reg_xieyi" @click="chosexieyi">
          <span class="kuang" v-if="!actxieyi"></span>
          <img src="/static/img/kexuanxieyi.png" v-else class="kuang_img">
          同意《与时校园用户注册协议》
        </div>
      </div>
      <!--家长-->
      <div class="input_box" v-if="jsnum==2">
        <div class="input_item">
          <input type="text" v-model="jiazhangname" @focus="chosepop(2)" placeholder="请选择" style="margin-left:16px;">
        </div>
        <div class="input_item">
          <img src="/static/img/phone_img.png" style="width:12px;height:21px;margin-left:10px;">
          <input type="text" v-model="mobile" placeholder="输入您的手机号">
        </div>
        <div class="input_item">
          <img src="/static/img/yzm.png" style="width:14px;height:17px;margin-left:8px;">
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
        <div class="yanzheng" @click="toreg2">注册</div>
        <div class="reg_xieyi" @click="chosexieyi" style="margin-bottom:40px;">
          <span class="kuang" v-if="!actxieyi"></span>
          <img src="/static/img/kexuanxieyi.png" v-else class="kuang_img">
          同意《与时校园用户注册协议》
        </div>
      </div>
      <!--老师-->
      <div class="input_box" v-if="jsnum==3">
        <div class="input_item">
          <input type="text" v-model="teachername" @focus="chosepop(3)" placeholder="请选择" style="margin-left:16px;">
        </div>
        <div class="input_item">
          <img src="/static/img/phone_img.png" style="width:12px;height:21px;margin-left:10px;">
          <input type="text" v-model="username2" placeholder="输入系统注册码">
        </div>
        <div class="input_item" v-show="zhucemas.length>0" v-for="(item,index) in zhucemas" :key="item.zid" style="width:290px;position:relative;left:-25px;">
          <img src="/static/img/phone_img.png" style="width:12px;height:21px;margin-left:10px;">
          <input type="text" v-model="item.zname" placeholder="输入系统注册码" style="width:220px;">
          <span @click="todelzcm(item,index)" class="delzhucema"> - </span>
        </div>
        <div @click="addzcm" class="addzhucema">+ 添加</div>
        <div class="yanzheng" @click="toyanzheng3">验证</div>
        <div class="reg_xieyi" @click="chosexieyi">
          <span class="kuang" v-if="!actxieyi"></span>
          <img src="/static/img/kexuanxieyi.png" v-else class="kuang_img">
          同意《与时校园用户注册协议》
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup" id="pop1">
      <mt-picker :slots="slots" :visible-item-count="5" :show-toolbar="true" @change="onValuesChange" ref="picker">
        <span @click="handlecancel" class="quxiao">取消</span>
        <span @click="handleConfirm" class="sure">确定</span>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Toast } from "mint-ui";
  import MintUI from 'mint-ui'
  Vue.use(MintUI , Toast  )
  export default {
    name: "Register2",
    data() {
      return {
        yzm: '获取验证码',
        sendSecondCount: 60,
        isshowsend: true,
        mobile: "",
        checkcode:'',
        password:'',
        password2:'',
        actxieyi:true,
        jsnum:'',
        popupVisible:false,
        jiazhangs:['母亲','父亲','其他'],
        teachers:['与时老师','学校老师','大学生志愿者'],
        slots: [
          {
            flex:1,
            values: [],
            className:'slots',
            textAlign: 'center'
          }
        ],
        daihao:0,
        jiazhangname:'',
        teachername:'',
        zhucemas:[],
        dataobjreg:{},
        username:'',
        username2:'',
      };
    },
    methods: {
      chosepop (num) {
        this.daihao=num
        if (num == 2) {
          this.slots[0].values=this.jiazhangs
        } else if (num == 3) {
          this.slots[0].values=this.teachers
        }
        this.popupVisible=true
      },
      handlecancel () {
        this.popupVisible = false
      },
      onValuesChange(picker, values) {
        if (this.daihao == 2 ) {
          this.jiazhangname = values[0];
        } else if (this.daihao == 3 ) {
          this.teachername = values[0];
        }
        if(values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },
      handleConfirm () {
        this.popupVisible = false
      },
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
        Toast({message: test, position: 'top', duration: 2000, className:'toast1'});
      },
      toyanzheng () {
        if (!this.username) {
          this.tos('请输入系统注册码')
          return false
        }
        if (!this.actxieyi) {
          this.tos('请同意《与时校园用户注册协议》')
          return false
        }
        this.dataobjreg={
          type:1,
          sysCode:this.username
        }
        this.toyz()
      },
      toyz () {
        let self = this;
        self.axios.post("/api/getStudentInfo", {sysCode:self.username}).then(data => {
          sessionStorage.setItem("yanzhengInfo", JSON.stringify(data));
          sessionStorage.setItem("dataobjreg", JSON.stringify(self.dataobjreg));
          self.$router.push({ path: "/register3sz"})
        });
      },
      toreg2 () {
        let regs=[this.jiazhangname,this.mobile,this.checkcode,this.password,this.password2]
        let tishiyu=['请选择家长角色','请输入您的手机号','请输入验证码','请输入密码','请再次输入密码']
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
        this.dataobjreg={
          type:this.jiazhangname=='母亲'?3:this.jiazhangname=='父亲'?2:this.jiazhangname=='其他'?4:0,
          phone:this.mobile,
          code:this.checkcode,
          password:this.password,
          repassword:this.password2
        }
        this.tozhuce()
      },
      tozhuce(){
        let self = this;
        self.axios.post("/api/register", self.dataobjreg).then(data => {
          self.tos('注册成功')
          self.$router.replace({path:"/loginsz"});
        });
      },
      toyanzheng3 () {
        if (!this.teachername || this.teachername=='') {
          this.tos('请选择老师角色')
          return false
        }
        if (!this.username2) {
          this.tos('请填写至少一个系统注册码')
          return false
        }
        if (!this.actxieyi) {
          this.tos('请同意《与时校园用户注册协议》')
          return false
        }
        let zcm=[]
        for (let item of this.zhucemas) {
          zcm.push(item.zname)
        }
        zcm.unshift(this.username2)
        this.dataobjreg={
          type:this.teachername=='与时老师'?5:this.teachername=='学校老师'?7:this.teachername=='大学生志愿者'?6:0,
          sysCode:zcm.join(',')
        }
        this.toyz2()
      },
      toyz2 () {
        let self = this;
        self.axios.post("/api/getSchoolInfo", {sysCode:self.dataobjreg.sysCode}).then(data => {
          sessionStorage.setItem("yanzhengInfo", JSON.stringify(data));
          sessionStorage.setItem("dataobjreg", JSON.stringify(self.dataobjreg));
          self.$router.push({ path: "/register3sz"})
        });
      },
      addzcm () {
        if (!this.username2) {
          this.tos('请填写至少一个系统注册码')
          return false
        }
        this.zhucemas.push({zid:this.zhucemas.length+1,zname:''})
      },
      todelzcm (it, ind) {
        this.zhucemas.splice(ind, 1)
      },
      chosexieyi () {
        this.actxieyi=!this.actxieyi
      }
    },
    mounted () {
      this.jsnum = window.sessionStorage.getItem('jsnum')
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
          span.delzhucema{
            display: inline-block;
            width:Rem(30);
            height: Rem(30);
            line-height: Rem(26);
            border-radius: 50%;
            text-align: center;
            background:#FE0001;
            color:#ffffff;
            font-size: Rem(26);
            position: absolute;
            top: Rem(4);
            right: Rem(-43);
          }
        }
        .addzhucema{
          margin:0 auto;
          margin-bottom:Rem(12);
          width:Rem(340);
          height:Rem(39);
          line-height:Rem(39);
          border:Rem(1) solid $bordercolor;
          border-radius: Rem(2);
          position: relative;
          font-size: Rem(16);
          color:#999999;
          text-align: center;
        }
        .yanzheng{
          margin:0 auto;
          width:Rem(340);
          height:Rem(45);
          line-height:Rem(45);
          border-radius: Rem(2);
          text-align: center;
          background: $background;
          font-size:Rem(15);
          color:#ffffff;
        }
        .reg_xieyi{
          margin-top:Rem(9);
          margin-left:Rem(17);
          margin-bottom:Rem(110);
          font-size:Rem(11);
          color:#666666;
          span.kuang{
            display: inline-block;
            width:Rem(11);
            height:Rem(10);
            border: Rem(1) solid #999999;
            border-radius: Rem(2);
            margin-right:Rem(8);
            margin-left:Rem(15);
          }
          img.kuang_img{
            width:Rem(13);
            height:Rem(14);
            margin-right:Rem(8);
            margin-left:Rem(15);
          }
        }
      }
    }
  }
</style>

<style>
  .toast1{
    width:260px;
  }
  .slots{
    width:100%;
    position:fixed;
    bottom:0;
    background:#ffffff;
  }
  .mint-popup{
    width:100%;
    min-height:225px;
  }
  #pop1 .picker-toolbar{
    height:50px;
    background:#F5F5F5;
  }
  #pop1 .sure{
    font-size:15px;
    position: absolute;
    right: 10px;
    top:10px;
    color:#5FB655;
  }
  #pop1 .quxiao{
    font-size:15px;
    position: absolute;
    left: 10px;
    top:10px;
    color:#5FB655;
  }
  #pop1 .picker-center-highlight{
    margin-top:0px !important;
  }
  #pop1 .picker-item{
    font-size:13px;
  }
  #pop1 .picker-selected{
    border-top: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
    color:#5FB655;
    font-size:15px;
  }
</style>
