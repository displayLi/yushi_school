<template>
  <div class="box_cont">
    <Header titleheader="支付"></Header>
    <div class="shipin_item_box">
      <div class="shipin_item">
        <img src="/static/img/shipinyangban_img.png">
        <div class="item_right">
          <p class="p1">{{obj.course_name}}</p>
          <p class="p3">{{'￥' + obj.source_price}}</p>
        </div>
      </div>
      <div class="detail_box">
        <div class="detail_title"><span>待支付</span><span>{{'￥' + obj.source_price}}</span></div>
        <div class="detail_num"><span>*</span> 完成支付后，您的孩子可以免费观看课程</div>
      </div>
    </div>
    <div class="hengtiao"></div>
    <div class="pay_type">
      <div class="pay_title">支付方式</div>
      <div class="chosepay" @click="chosepaytype">
        <span class="kxk" v-if="!actpaytype"></span>
        <img src="/static/img/duigou.png" v-else class="kx_img">
        <span class="weipay"><img src="/static/img/weixinpay.png"><span>微信支付</span></span>
      </div>
    </div>
    <div class="ljzf" @click="tozhifu">立即支付</div>
  </div>
</template>

<script>
  import Header from "../../components/Header.vue";
  import { Toast , MessageBox } from "mint-ui";
  export default {
    name: "Payclass",
    data() {
      return {
        obj:{},
        actpaytype:true,
        userInfo:{},
        payobj:{},
        classid:''
      };
    },
    methods: {
      tos (test) {
        Toast({message: test, position: 'top', duration: 2000});
      },
      chosepaytype () {
        this.actpaytype=!this.actpaytype
      },
      tozhifu () {
        if (!this.actpaytype) {
          this.tos('请选择支付方式')
          return false
        }
        this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"))
        let paydata={
          name:this.userInfo.real_name,
          phone:this.userInfo.phone,
          amount:this.obj.source_price*100,
          num:1
        }
        let self=this
        self.axios.post('/pay/saveUserOrder', paydata)
          .then(data => {
            let orderhao=data
            let paydata2={
              uuid:self.userInfo.mac_uuid==null?null:self.userInfo.mac_uuid,
              no:self.classid,
              bizType:1,
              amount:self.obj.source_price*100,
              payType:0,
              subject:self.obj.course_name,
              num:1,
              orderId:orderhao,
              channel:1
            }
            self.axios.post('/pay/prePay', paydata2)
              .then(data => {
                self.payobj=data
                self.onBridgeReady()
            })
        })

        if (typeof WeixinJSBridge == "undefined"){
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        }else{
          self.onBridgeReady();
        }
      },
      onBridgeReady(){
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId":this.payobj.appId,     //公众号名称，由商户传入
            "timeStamp":this.payobj.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr":this.payobj.nonceStr, //随机串
            "package":this.payobj.packageStr,
            "signType":"MD5",         //微信签名方式：
            "paySign":this.payobj.paySign //微信签名
          },
          function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              // this.tos('支付成功')
              this.$router.replace({ path: "/ketangxiangqingzf"})
            }
          }
        );
      }
    },
    components: { Header },
    mounted () {
      this.classid=this.$route.query.classid
      this.obj=JSON.parse(sessionStorage.getItem("userobj"))

    }
  }
</script>

<style lang="scss" scoped>
  @import "src/common/css/mixin";
  $background: #5FB655;
  .box_cont{
    width:100%;
    min-height: 100vh;
    background: #ffffff;
    .shipin_item_box{
      width:Rem(375);
      margin:0 auto;
      margin-top:Rem(43);
      .shipin_item{
        width:Rem(350);
        margin: 0 auto;
        padding-top:Rem(21);
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        img{
          width:Rem(119);
          height:Rem(77);
        }
        .item_right{
          position:relative;
          width:Rem(211);
          height:Rem(77);
          .p1{
            color:#333333;
            font-size:Rem(15);
          }
          .p3{
            position:absolute;
            bottom:0;
            color:#999999;
            font-size:Rem(12);
          }
        }
      }
      .detail_box{
        width:Rem(375);
        margin:0 auto;
        .detail_title{
          width:100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: nowrap;
          margin-top:Rem(30);
          margin-bottom: Rem(8);
          span:first-child{
            margin-left:Rem(15);
            color:#333333;
            font-size:Rem(12);
          }
          span:last-child{
            margin-right:Rem(11);
            color:#FE0001;
            font-size:Rem(18);
            position: relative;
            top:Rem(-3);
          }
        }
        .detail_num{
          margin-left:Rem(15);
          margin-bottom: Rem(17);
          color:#333333;
          font-size:Rem(12);
          span{
            color:#FE0001;
          }
        }
      }
    }
    .hengtiao{
      width:100%;
      height:Rem(10);
      background: #FAFAFA;
    }
    .pay_type{
      width:Rem(375);
      margin:0 auto;
      .pay_title{
        margin-left:Rem(27);
        margin-top:Rem(20);
        color:#333333;
        font-size:Rem(12);
      }
      .chosepay{
        margin-left:Rem(27);
        margin-top:Rem(30);
        .kxk{
          display: inline-block;
          width:Rem(12);
          height:Rem(12);
          border-radius: 50%;
          border:Rem(1) solid #999999;
          position: relative;
          top:Rem(-12);
        }
        img.kx_img{
          width:Rem(14);
          height:Rem(14);
          position: relative;
          top:Rem(-12);
        }
        .weipay{
          margin-left:Rem(10);
          img{
            width:Rem(35);
            height:Rem(35);
            margin-right:Rem(10);
          }
          span{
            color:#333333;
            font-size:Rem(15);
            position: relative;
            top:Rem(-12);
          }
        }
      }
    }
    .ljzf{
      width:Rem(375);
      height:Rem(45);
      line-height:Rem(45);
      margin:0 auto;
      border-radius: Rem(2);
      text-align: center;
      background:$background;
      color: #ffffff;
      font-size:Rem(15);
      position: fixed;
      bottom:0;
      z-index: 100;
    }
  }
</style>
