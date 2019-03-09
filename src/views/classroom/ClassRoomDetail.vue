<template>
  <div class="box_cont">
    <ClassHeader
      :favouritehistory="obj.favourite_history"
      :getdata="getdata"
      :coursename="obj.course_name"
      :classid="classid" :islogin="islogin">
    </ClassHeader>
    <div class="shipin_box">
      <video :src="obj.videoUrl" controls="controls" controlslist="nodownload" id="media" @play="ispay"
             :style="`background: url(${/mp3$/.test(obj.videoUrl)?obj.logo:''}); background-size: 100% 100%`">
      </video>
    </div>
    <div class="detail_box">
      <div class="detail_title">
        <span>{{obj.course_name}}</span>
        <!--<img src="/static/img/zhuanfa.png" class="zhuanfa" @click="showzhuanfa">-->
      </div>
      <div class="detail_num">
        <span>{{obj.page_viewcount}}人参与</span>
        <span :class="buyHistory==2?'hong':''">{{buyHistory==0?'免费':buyHistory==1?'已购买':buyHistory==2?obj.source_price:''}}</span>
      </div>
    </div>
    <div class="hengtiao"></div>
    <div class="detail_nav">
      <span :class="actdetail==1?'actdetail':''" @click="tonavdetail(1)">课程详情</span>
      <span :class="actdetail==2?'actdetail':''" @click="tonavdetail(2)">目录</span>
      <span :class="actdetail==3?'actdetail':''" @click="tonavdetail(3)">评论</span>
      <span :class="actdetail==4?'actdetail':''" @click="tonavdetail(4)">上传作业</span>
    </div>
    <!--详情-->
    <div class="classdetail" v-if="actdetail==1">
      <div class="showdetail" v-show="JSON.parse(obj.teacher_content).length!=0">
        <img :src="item" v-for="item of JSON.parse(obj.teacher_content)" class="showdetail_img">
      </div>
      <div class="shownull" v-show="JSON.parse(obj.teacher_content).length==0">
        还没有详情介绍
      </div>
    </div>
    <!--目录-->
    <div class="mulu" v-if="actdetail==2">
      <div class="showmulu" v-show="catalog.length!=0">
        <div class="mulu_item" v-for="(item, index) of catalog"><span>{{index+1+' . '}}</span><span>{{item.catalogName}}</span></div>
      </div>
      <div class="shownull" v-show="catalog.length==0">
      暂时没有目录
      </div>
    </div>
    <!--评论-->
    <div class="pinglun" v-if="actdetail==3">
      <div class="showpinglun" v-show="comments.length!=0">
        <div class="allpinglun" @click="toallpl">全部评论 <span> > </span></div>
        <div class="pinglunlist">
          <div class="pinglun_item" v-for="(item, index) of comments">
            <img :src="item.icon" class="item_left">
            <div class="item_right">
              <p class="p1">{{item.nick_name}}</p>
              <p class="p2">{{item.content}}</p>
              <p class="p3"><span>{{item.add_time}}</span> <span class="p3_pl" @click="addComment2(item)"><img src="/static/img/pl.png" class="pl_logo">评论</span></p>
              <div class="item_pl">
                <span class="before"></span>
                <p class="item_pl_item" v-for="(reply, index) of item.replyList"><span>{{reply.nick_name + ' : '}}</span>{{reply.content}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shownull" v-show="comments.length==0">还没有评论，马上评论吧</div>
      <div class="pinglun_btn" @click="addComment">评论</div>
    </div>
    <!--作业-->
    <div class="uploadzuoye" v-if="actdetail==4">
      <!--<div class="showzuoye">-->

      <!--</div>-->
      <div class="shownull">此课程没有作业</div>
    </div>

  </div>
</template>

<script>
  import Vue from "vue";
  import ClassHeader from "./ClassHeader.vue";
  import MintUI from 'mint-ui'
  import { Toast , MessageBox } from "mint-ui";
  Vue.use(MintUI , Toast , MessageBox )
  export default {
    name: "ClassRoomDetail",
    data() {
      return {
        actdetail:1,
        classdetail:'课程详情',
        mess:null,
        classid:'',
        userInfo:{},
        obj:{},
        catalog:[],
        comments:[],
        buyHistory:'',
        mess2:null,
      };
    },
    methods: {
      showzhuanfa () {
        document.getElementById('zhuanfacont').style.display='block'
      },
      tonavdetail (num) {
        this.actdetail=num
        if (this.actdetail==3) {
          if (sessionStorage.getItem("userInfo")) {
            this.getComment()   //  已登录获取评论接口
          } else {
            this.islogin()    //  未登录去登录
          }
        }
        if (this.actdetail==4) {
          if (sessionStorage.getItem("userInfo")) {

          } else {
            this.islogin()    //  未登录去登录
          }
        }
      },
      toallpl () {
        this.$router.push({ path: "/allketangpinglun",query:{titleheader:'全部评论'}})
      },
      islogin () {
        this.mess=MessageBox({
          title: '请登录',
          message: '您还没有登录，请登录后查看',
          showCancelButton:true,
          showConfirmButton:true,
          confirmButtonText:'登录',
          cancelButtonText:'取消',
          closeOnClickModal:false,
        }).then(action=>{
          if (action == 'confirm') {     //确认的回调
            // this.mess.close();
            this.$router.push({ path: "/loginbeforesz"})
          } else if (action == 'cancel') {  //取消的回调
            // this.mess.close();
          }
        })
      },
      // closeyemian () {
      //   window.opener=null;
      //   window.open('','_self');
      //   window.close();
      // },
      getdata () {
        let self=this
        self.axios.post('/course/getCourseDetailAll', {courseId: this.classid})  //详情
          .then(data => {
            self.buyHistory=data.buyHistory
            self.obj = data.course
            self.catalog = data.courseCatalogList
          })
      },
      getComment () {
        this.axios.post('/friend/getCourseCommentList', {otherId: this.classid})  // 所有评论
          .then(data => {
            this.comments = data.list
          })
      },
      ispay () {
        let self=this
        var myVideo=document.getElementById("media");
        myVideo.pause()
        if (sessionStorage.getItem("userInfo")) {
          if (self.buyHistory==2) {
            self.topay()
          } else {
            myVideo.play()
          }
        } else {
          self.islogin()    //  未登录去登录
        }
      },
      topay () {
        this.mess2=MessageBox({
          title: '未购买',
          message: '此为付费课程，请购买后查看',
          showCancelButton:true,
          showConfirmButton:true,
          confirmButtonText:'购买',
          cancelButtonText:'取消',
          closeOnClickModal:false,
        }).then(action=>{
          if (action == 'confirm') {     //确认的回调
            sessionStorage.setItem("userobj", JSON.stringify(this.obj))
            this.$router.push({ path: "/payclass",query:{classid:this.classid}})
          } else if (action == 'cancel') {  //取消的回调

          }
        })
      },
      addComment () {
        MessageBox.prompt('评论').then(({ value, action }) => {
          this.axios.post('/friend/addComment', {
            content: value,
            otherId: this.classid,         //
            type: 1,
          }).then(data => {
            this.getComment()
          })
        })
      },
      // 二级评论
      addComment2 (commentObj) {
        MessageBox.prompt('评论').then(({ value, action }) => {
          this.axios.post('/friend/addComment', {
            content: value,
            otherId: this.classid,         //
            toUserId: commentObj.user_id,
            type: 1,
            parentId: commentObj.comment_id
          }).then(data => {
            this.getComment()
          })
        })
      },
    },
    components: { ClassHeader },
    mounted () {
      this.classid=this.$route.query.id
      sessionStorage.setItem('classid',this.classid)
      // if (sessionStorage.getItem("userInfo")) {
       this.getdata()
       // this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"))
        // this.getComment()
      // } else {
        // this.islogin()
      // }
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
    .shipin_box{
      width:Rem(375);
      height: Rem(192);
      margin:0 auto;
      background: #333333;
      margin-top:Rem(43);
      video{
        width:100%;
        height:100%;
      }
    }
    .detail_box{
      width:Rem(375);
      margin:0 auto;
      .detail_title{
        color:#333333;
        font-size:Rem(15);
        margin-top:Rem(8);
        margin-left:Rem(15);
        position: relative;
        img.zhuanfa{
          position: absolute;
          top:Rem(3);
          right:Rem(11);
          width:Rem(12);
          height:Rem(12);
        }
      }
      .detail_num{
        width:100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        margin-top:Rem(10);
        margin-bottom: Rem(10);
        span:first-child{
          margin-left:Rem(15);
          color:#999999;
          font-size:Rem(12);
        }
        span:last-child{
          margin-right:Rem(11);
          color:$background;
          font-size:Rem(12);
        }
        span.hong{
          color:#FE0001;
        }
      }
    }
    .hengtiao{
      width:100%;
      height:Rem(10);
      background: #FAFAFA;
    }
    .detail_nav{
      width:Rem(375);
      height: Rem(45);
      margin:0 auto;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      padding-left:Rem(13);
      padding-right:Rem(13);
      border-bottom:Rem(1) solid #EEEEEE;
      span{
        color:#333333;
        font-size:Rem(15);
        height: Rem(40);
        line-height:Rem(40);
      }
      span.actdetail{
        border-bottom:Rem(1.5) solid $background;
      }
    }
    .classdetail{
      width:Rem(375);
      min-height: Rem(200);
      margin:0 auto;
      .showdetail{
        width:Rem(375);
        min-height: Rem(200);
        text-align: center;
        .showdetail_img{
          width:91%;
        }
      }
      .shownull{
        width:Rem(375);
        margin-top:Rem(44);
        text-align: center;
        font-size:Rem(15);
        color:#666666;
      }
    }
    .mulu{
      width:Rem(375);
      min-height: Rem(200);
      margin:0 auto;
      padding-top:Rem(10);
      .showmulu{
        width:Rem(375);
        min-height: Rem(200);
        .mulu_item{
          width:100%;
          margin-top:Rem(23);
          box-sizing: border-box;
          padding:0 Rem(12);
          font-size:Rem(15);
          color:#666666;
          display: flex;
          span:last-child{
            display: inline-block;
            width:80%;
            margin-left:Rem(25);
            line-height:Rem(20);
          }
        }
      }
      .shownull{
        width:Rem(375);
        margin-top:Rem(44);
        text-align: center;
        font-size:Rem(15);
        color:#666666;
      }
    }
    .pinglun{
      width:Rem(375);
      min-height: Rem(200);
      margin:0 auto;
      padding-bottom:Rem(50);
      .showpinglun{
        width:Rem(375);
        min-height: Rem(200);
        .allpinglun{
          width:100%;
          border-bottom:Rem(1) solid #EEEEEE;
          font-size:Rem(12);
          color:#666666;
          height: Rem(43);
          line-height: Rem(43);
          text-align: right;
          span{
            display: inline-block;
            transform: scale(1,1.7);
            margin-right:Rem(15);
            position: relative;
            top:Rem(-1);
          }
        }
        .pinglunlist{
          .pinglun_item{
            margin-top:Rem(12);
            display: flex;
            box-sizing: border-box;
            padding-left:Rem(16);
            padding-right:Rem(15);
            img.item_left{
              width:Rem(55);
              height: Rem(55);
              border-radius: 50%;
              margin-right:Rem(8);
              position:relative;
              top:Rem(-3);
            }
            .item_right{
              width:Rem(280);
              .p1{
                color:#333333;
                font-size:Rem(13);
              }
              .p2{
                color:#666666;
                font-size:Rem(13);
                margin-top:Rem(6);
              }
              .p3{
                width:100%;
                color:#999999;
                margin-top:Rem(11);
                display: flex;
                justify-content: space-between;
                flex-wrap: nowrap;
                span{
                  font-size:Rem(11);
                }
                .p3_pl{
                  position: relative;
                  top:Rem(-3);
                  img.pl_logo{
                    width:Rem(15);
                    height: Rem(14);
                    margin-right:Rem(6);
                    position: relative;
                    top:Rem(3);
                  }
                }
              }
              .item_pl{
                margin-top:Rem(11);
                background:#FAFAFA;
                width:Rem(280);
                box-sizing: border-box;
                padding:Rem(3) Rem(13) Rem(10) Rem(10);
                border-radius:Rem(4);
                position: relative;
                span.before{
                  width:0;
                  height:0;
                  border: Rem(6) solid transparent;
                  border-bottom:Rem(6) solid #FAFAFA;
                  position:absolute;
                  top:Rem(-12);
                  left:Rem(15);
                }
                .item_pl_item{
                  padding-top:Rem(8);
                  font-size:Rem(11);
                  color:#666666;
                  span{
                    color:#0D0DFB;
                  }
                }
              }
            }
          }
        }
      }
      .shownull{
        width:Rem(375);
        margin-top:Rem(14);
        text-align: center;
        font-size:Rem(15);
        color:#666666;
      }
      .pinglun_btn{
        width:Rem(70);
        height:Rem(30);
        line-height:Rem(30);
        margin:0 auto;
        margin-top:Rem(24);
        margin-bottom:Rem(20);
        border:Rem(1) solid $background;
        text-align: center;
        border-radius: Rem(4);
        font-size:Rem(15);
        color:$background;
      }
    }
    .uploadzuoye{
      width:Rem(375);
      min-height: Rem(200);
      margin:0 auto;
      .showzuoye{
        width:Rem(375);
        min-height: Rem(200);
      }
      .shownull{
        width:Rem(375);
        margin-top:Rem(44);
        text-align: center;
        font-size:Rem(15);
        color:#666666;
      }
    }
  }
</style>
